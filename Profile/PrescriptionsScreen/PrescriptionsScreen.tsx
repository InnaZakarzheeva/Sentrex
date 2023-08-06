import React, { useEffect, useState } from "react";
import { Pressable, StatusBar, View, Image } from "react-native";
import { AppString, CloseIconSvg, PlusSvg } from "../../../../resources";
import { FilesPayload, ModalPayload } from "../../../../state";
import {
  AppButton,
  AppText,
  BlockedLoader,
  PreviewModal,
  ProfileHeader,
  RequestStatusModal,
  ScreenContainer,
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
  const [prescriptions, setPrescriptions] = useState<Array<FilesPayload>>([]);
  const [choosenImage, setChoosenImage] = useState<ModalPayload>();
  const [isVisiblePreviewModal, setVisiblePreviewModal] = useState(false);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [idsForDelete, setIdsForDelete] = useState<Array<string>>([]);

  const onUpdateSuccess = () => {
    props.hideError();
    setDisabledBtn(true);
    setIdsForDelete([]);
  };

  const onGetSuccess = () => {
    setPrescriptions(props.prescriptions);
  };

  const errorVisible = useRequestStatus(props.requestStatus, onUpdateSuccess);
  const getFilesErrorVisible = useRequestStatus(
    props.requestGetFilesStatus,
    onGetSuccess
  );

  useEffect(() => {
    props.getFiles("Prescription");
  }, []);

  useEffect(() => {
    setDisabledBtn(_.isEqual(props.prescriptions, prescriptions));
  }, [prescriptions, props.prescriptions]);

  const onUpdate = () => {
    const data = prescriptions.filter((item) => item.type);
    props.updateFiles({
      deleted: idsForDelete,
      added: {
        files: data
      },
      fileType: "Prescription"
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
            const { fileName, uri, type } = response;
            if (fileName && uri && type) {
              setVisibleModal(false);
              setPrescriptions((result) => [
                ...result,
                {
                  name: fileName,
                  uri: uri,
                  type: type,
                  filesType: "Prescription"
                }
              ]);
            }
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
            const { fileName, uri, type } = response;
            if (fileName && uri && type) {
              setVisibleModal(false);
              setPrescriptions((result) => [
                ...result,
                {
                  name: fileName,
                  uri: uri,
                  type: type,
                  filesType: "Prescription"
                }
              ]);
            }
          }
        );
      },
      setVisibleModal.bind(this, false)
    );
  };

  const onClose = (index: number) => {
    setPrescriptions(prescriptions.filter((item, i) => i !== index));
    const id = prescriptions.find((item, i) => i === index)?.id;
    if (id) {
      setIdsForDelete((result) => [...result, id]);
    }
  };

  const onDelete = () => {
    if (choosenImage?.index || choosenImage?.index === 0) {
      onClose(choosenImage.index);
    }
    setVisiblePreviewModal(false);
  };

  const onOpenImage = (uri: string | undefined, index: number) => {
    if (uri) {
      setChoosenImage({
        image: uri,
        index
      });
    }
    setVisiblePreviewModal(true);
  };

  const renderImages = () =>
    prescriptions.map((item: ImagePickerResponse, index: number) => (
      <Pressable
        style={styles.uploadWrapper}
        onPress={onOpenImage.bind(this, item.uri, index)}
        key={index}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        <Pressable
          style={styles.closeWrapper}
          onPress={onClose.bind(this, index)}>
          <CloseIconSvg />
        </Pressable>
      </Pressable>
    ));

  const renderUploadBtn = () => (
    <Pressable
      style={styles.uploadWrapper}
      onPress={setVisibleModal.bind(this, true)}>
      <PlusSvg />
      <AppText fontType="subheading_2" style={styles.uploadLabel}>
        {prescriptions.length === 0
          ? AppString.get().addImage
          : AppString.get().addAnotherImage}
      </AppText>
    </Pressable>
  );

  return (
    <ScreenContainer style={styles.root}>
      <StatusBar
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ProfileHeader
        title={AppString.get().yourPrescriptions}
        userName={props.user?.firstName}
      />
      <View style={styles.contenWrapper}>
        <View style={styles.brandWrapper}>
          <Image
            source={{ uri: props.brand?.logoPath }}
            style={styles.brandImage}
            resizeMode="contain"
          />
          <AppText fontType="paragraph_2" style={styles.label}>
            {AppString.get().addOrDeletePrescriptions}
          </AppText>
        </View>
        <View style={styles.imagesWrapper}>
          {renderImages()}
          {renderUploadBtn()}
        </View>
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
        title={AppString.get().uploadPrescription}
      />
      <PreviewModal
        visible={isVisiblePreviewModal}
        onCancel={setVisiblePreviewModal.bind(this, false)}
        image={choosenImage?.image}
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
