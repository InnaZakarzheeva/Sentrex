import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { AppString } from "../../../../resources";
import { FilesPayload, ImageType } from "../../../../state";
import {
  AppButton,
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

const HealthCardScreen = (props: Props) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [healthCards, setHealthCards] = useState<Array<FilesPayload>>([]);
  const [imageType, setImageType] = useState<ImageType | null>(null);
  const [choosenImage, setChoosenImage] = useState<FilesPayload | null>(null);
  const [isVisiblePreviewModal, setVisiblePreviewModal] = useState(false);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [idsForDelete, setIdsForDelete] = useState<Array<string>>([]);

  const onGetSuccess = () => {
    setHealthCards(props.healthCards);
  };

  const onUpdateSuccess = () => {
    props.hideError();
    setIdsForDelete([]);
    setDisabledBtn(true);
  };

  const errorVisible = useRequestStatus(props.requestStatus, onUpdateSuccess);
  const getFilesErrorVisible = useRequestStatus(
    props.requestGetFilesStatus,
    onGetSuccess
  );

  useEffect(() => {
    props.getFiles("HealthCard");
  }, []);

  useEffect(() => {
    if (!_.isEqual(healthCards, props.healthCards)) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [healthCards]);

  const onUpdate = () => {
    const data = healthCards.filter((item) => item.type);
    props.updateFiles({
      deleted: idsForDelete,
      added: {
        files: data
      },
      fileType: "HealthCard"
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
          setHealthCards((result) => [
            ...result,
            {
              ...file,
              description: "FRONT",
              filesType: "HealthCard"
            }
          ]);
          break;
        case "BACK":
          setHealthCards((result) => [
            ...result,
            {
              ...file,
              description: "BACK",
              filesType: "HealthCard"
            }
          ]);
          break;
      }
    }
  };

  const openPhoto = (type: ImageType) => {
    const choosenImage = healthCards.filter(
      (item) => item.description === type
    );
    setImageType(type);
    setChoosenImage(choosenImage[0]);
    setVisiblePreviewModal(true);
  };

  const uploadPhoto = (type: ImageType) => {
    setImageType(type);
    setVisibleModal(true);
  };

  const deletePhoto = (type: ImageType) => {
    const id = healthCards.find((item) => item.description === type)?.id;
    if (id) setIdsForDelete((result) => [...result, id]);
    setHealthCards(healthCards.filter((item) => item.description !== type));
  };

  const onDelete = () => {
    if (imageType) {
      deletePhoto(imageType);
    }
    setVisiblePreviewModal(false);
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
        title={AppString.get().healthCardTitle}
        userName={props.user?.firstName}
      />
      <View style={styles.contenWrapper}>
        <UploadImageBlock
          item={healthCards.find((item) => item.description === "FRONT")}
          itemType="FRONT"
          openPhoto={openPhoto}
          deletePhoto={deletePhoto}
          uploadPhoto={uploadPhoto}
        />
        <UploadImageBlock
          item={healthCards.find((item) => item.description === "BACK")}
          itemType="BACK"
          openPhoto={openPhoto}
          deletePhoto={deletePhoto}
          uploadPhoto={uploadPhoto}
        />
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
        title={AppString.get().uploadHealthCard}
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

export default HealthCardScreen;
