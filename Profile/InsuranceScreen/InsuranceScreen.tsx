import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { AppString, PlusSvg } from "../../../../resources";
import { FilesPayload, ImageType } from "../../../../state";
import {
  AppButton,
  AppText,
  BlockedLoader,
  PreviewModal,
  ProfileHeader,
  RequestStatusModal,
  ScreenContainer,
  UploadImageBlock,
  UploadModal
} from "../../../components";
import { styles } from "./styles";
import Props from "./types";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse
} from "react-native-image-picker";
import { useRequestStatus } from "../../hooks";
import _ from "lodash";
import { handlePermission } from "../../../../utils";

const InsuranceScreen = (props: Props) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [insurances, setInsurances] = useState<Array<FilesPayload>>([]);
  const [secondaryInsurance, setSecondaryInsurance] = useState(false);
  const [imageType, setImageType] = useState<ImageType | null>(null);
  const [choosenImage, setChoosenImage] = useState<FilesPayload | null>(null);
  const [isVisiblePreviewModal, setVisiblePreviewModal] = useState(false);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [idsForDelete, setIdsForDelete] = useState<Array<string>>([]);

  const onUpdateSuccess = () => {
    props.hideError();
    setIdsForDelete([]);
    setDisabledBtn(true);
  };

  const onGetSuccess = () => {
    const secondaryInsuranceData = props.secondaryInsurance.map(
      (item): FilesPayload => {
        switch (item.description) {
          case "FRONT":
            return {
              ...item,
              description: "SECONDARY_FRONT"
            };
          case "BACK":
            return {
              ...item,
              description: "SECONDARY_BACK"
            };
          default:
            return item;
        }
      }
    );
    setInsurances([...props.primaryInsurance, ...secondaryInsuranceData]);
  };

  const errorVisible = useRequestStatus(props.requestStatus, onUpdateSuccess);
  const getFilesErrorVisible = useRequestStatus(
    props.requestGetFilesStatus,
    onGetSuccess
  );

  useEffect(() => {
    props.getFiles("PrimaryInsurance");
  }, []);

  useEffect(() => {
    setDisabledBtn(
      _.isEqual(
        [...props.primaryInsurance, ...props.secondaryInsurance],
        insurances
      )
    );
  }, [insurances]);

  const onUpdate = () => {
    const data = insurances
      .map(
        (item): FilesPayload => {
          switch (item.description) {
            case "SECONDARY_FRONT":
              return {
                ...item,
                description: "FRONT"
              };
            case "SECONDARY_BACK":
              return {
                ...item,
                description: "BACK"
              };
            default:
              return item;
          }
        }
      )
      .filter((item) => item.type);
    props.updateFiles({
      deleted: idsForDelete,
      added: {
        files: data
      },
      fileType: "PrimaryInsurance",
      additionalFileType: "SecondaryInsurance"
    });
  };

  const getFromCamera = () => {
    handlePermission(
      "camera",
      () => {
        launchCamera(
          {
            mediaType: "photo",
            includeBase64: false
          },
          (response: ImagePickerResponse) => {
            setImage(response);
          }
        );
      },
      setVisibleModal.bind(this, false)
    );
  };

  const getFromLibrary = () => {
    handlePermission(
      "photo_lib",
      () => {
        launchImageLibrary(
          {
            mediaType: "photo",
            includeBase64: false
          },
          (response: ImagePickerResponse) => {
            setImage(response);
          }
        );
      },
      setVisibleModal.bind(this, false)
    );
  };

  const setImage = (response: ImagePickerResponse) => {
    const { fileName, uri, type } = response;
    if (fileName && uri && type) {
      const file = {
        name: fileName,
        uri: uri,
        type: type
      };
      setVisibleModal(false);
      switch (imageType) {
        case "FRONT":
          setInsurances((result) => [
            ...result,
            {
              ...file,
              description: "FRONT",
              filesType: "PrimaryInsurance"
            }
          ]);
          break;
        case "BACK":
          setInsurances((result) => [
            ...result,
            {
              ...file,
              description: "BACK",
              filesType: "PrimaryInsurance"
            }
          ]);
          break;
        case "SECONDARY_FRONT":
          setInsurances((result) => [
            ...result,
            {
              ...file,
              description: "SECONDARY_FRONT",
              filesType: "SecondaryInsurance"
            }
          ]);
          break;
        case "SECONDARY_BACK":
          setInsurances((result) => [
            ...result,
            {
              ...file,
              description: "SECONDARY_BACK",
              filesType: "SecondaryInsurance"
            }
          ]);
          break;
      }
    }
  };

  const openPhoto = (type: ImageType) => {
    const choosenImage = insurances.filter((item) => item.description === type);
    setImageType(type);
    setChoosenImage(choosenImage[0]);
    setVisiblePreviewModal(true);
  };

  const uploadPhoto = (type: ImageType) => {
    setImageType(type);
    setVisibleModal(true);
  };

  const deletePhoto = (type: ImageType) => {
    const id = insurances.find((item) => item.description === type)?.id;
    if (id) {
      setIdsForDelete((result) => [...result, id]);
    }
    setInsurances(insurances.filter((item) => item.description !== type));
  };

  const onDelete = () => {
    if (imageType) {
      deletePhoto(imageType);
    }
    setVisiblePreviewModal(false);
  };

  const openSecondaryInsurance = () => {
    setSecondaryInsurance(true);
    props.getFiles("SecondaryInsurance");
  };

  return (
    <ScreenContainer style={styles.root}>
      <StatusBar
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ProfileHeader
        title={AppString.get().yourInsuranceDetails}
        userName={props.user?.firstName}
      />
      <View style={styles.contenWrapper}>
        <AppText fontType="subheading_2">
          {AppString.get().primaryInsurance}
        </AppText>
        <View style={styles.insuranceWrapper}>
          <UploadImageBlock
            item={insurances.find(
              (item) =>
                item.description === "FRONT" &&
                item.filesType === "PrimaryInsurance"
            )}
            itemType="FRONT"
            openPhoto={openPhoto}
            deletePhoto={deletePhoto}
            uploadPhoto={uploadPhoto}
          />
          <UploadImageBlock
            item={insurances.find(
              (item) =>
                item.description === "BACK" &&
                item.filesType === "PrimaryInsurance"
            )}
            itemType="BACK"
            openPhoto={openPhoto}
            deletePhoto={deletePhoto}
            uploadPhoto={uploadPhoto}
          />
        </View>
        {secondaryInsurance ? (
          <>
            <AppText fontType="subheading_2" style={styles.insuranceLabel}>
              {AppString.get().secondaryInsurance}
            </AppText>

            <View style={styles.uploaderWrapper}>
              <UploadImageBlock
                item={insurances.find(
                  (item) =>
                    item.description === "SECONDARY_FRONT" ||
                    (item.description === "FRONT" &&
                      item.filesType === "SecondaryInsurance")
                )}
                itemType="SECONDARY_FRONT"
                openPhoto={openPhoto}
                deletePhoto={deletePhoto}
                uploadPhoto={uploadPhoto}
              />
              <UploadImageBlock
                item={insurances.find(
                  (item) =>
                    item.description === "SECONDARY_BACK" ||
                    (item.description === "BACK" &&
                      item.filesType === "SecondaryInsurance")
                )}
                itemType="SECONDARY_BACK"
                openPhoto={openPhoto}
                deletePhoto={deletePhoto}
                uploadPhoto={uploadPhoto}
              />
            </View>
          </>
        ) : (
          <AppButton
            title={AppString.get().addSecondaryInsurance}
            styleMode="text"
            icon={<PlusSvg />}
            style={styles.addInsuranceBtn}
            titleStyle={styles.addInsuranceBtnTitle}
            onPress={openSecondaryInsurance}
          />
        )}
      </View>
      <AppButton
        title={AppString.get().update}
        onPress={onUpdate}
        disabled={disabledBtn}
        style={styles.updateBtn}
      />
      <UploadModal
        visible={isVisibleModal}
        launchCamera={getFromCamera}
        launchLibrary={getFromLibrary}
        onCancel={setVisibleModal.bind(this, false)}
        title={AppString.get().uploadInsurances}
      />
      <PreviewModal
        visible={isVisiblePreviewModal}
        onCancel={setVisiblePreviewModal.bind(this, false)}
        image={choosenImage?.uri}
        onDelete={onDelete}
      />

      <BlockedLoader
        visible={
          props.requestStatus === "pending" ||
          props.requestGetFilesStatus === "pending"
        }
      />
      {props.error && (
        <RequestStatusModal
          visible={errorVisible}
          message={props.error.message}
          onActionPress={props.hideError}
        />
      )}
      {props.getFilesError && (
        <RequestStatusModal
          visible={getFilesErrorVisible}
          message={props.getFilesError.message}
          onActionPress={props.hideGetFilesError}
        />
      )}
    </ScreenContainer>
  );
};

export default InsuranceScreen;
