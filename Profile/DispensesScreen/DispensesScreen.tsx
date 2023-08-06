import React, { useEffect, useState } from "react";
import { View, Pressable, Image, StatusBar } from "react-native";
import {
  AppText,
  UploadModal,
  PreviewModal,
  AppButton,
  RequestStatusModal,
  BlockedLoader,
  ProfileHeader,
  ScreenContainer
} from "../../../components";
import _ from "lodash";
import Props from "./types";
import { styles } from "./styles";
import { AppString, CloseIconSvg, PlusSvg } from "../../../../resources";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse
} from "react-native-image-picker";
import { useRequestStatus } from "../../hooks";
import { FilesPayload, ModalPayload } from "../../../../state";
import { handlePermission } from "../../../../utils";

const DispensesScreen = (props: Props) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [choosenImage, setChoosenImage] = useState<ModalPayload>();
  const [dispence, setDispence] = useState<Array<FilesPayload>>([]);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [isVisiblePreviewModal, setVisiblePreviewModal] = useState(false);
  const [idsForDelete, setIdsForDelete] = useState<Array<string>>([]);

  const onUpdateSuccess = () => {
    props.hideError();
    setDisabledBtn(true);
    setIdsForDelete([]);
  };

  const onGetSuccess = () => {
    setDispence(props.dispenses);
  };

  const errorVisible = useRequestStatus(props.requestStatus, onUpdateSuccess);
  const getFilesErrorVisible = useRequestStatus(
    props.requestGetFilesStatus,
    onGetSuccess
  );

  useEffect(() => {
    props.getFiles("Dispense");
  }, []);

  useEffect(() => {
    setDisabledBtn(_.isEqual(props.dispenses, dispence));
  }, [dispence, props.dispenses]);

  const onUpdate = () => {
    const data = dispence.filter((item) => item.type);
    props.updateFiles({
      deleted: idsForDelete,
      added: {
        files: data
      },
      fileType: "Dispense"
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
              setDispence((result) => [
                ...result,
                {
                  name: fileName,
                  uri: uri,
                  type: type,
                  filesType: "Dispense"
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
              setDispence((result) => [
                ...result,
                {
                  name: fileName,
                  uri: uri,
                  type: type,
                  filesType: "Dispense"
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
    setDispence(dispence.filter((item, i) => i !== index));
    const id = dispence.find((item, i) => i === index)?.id;
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
    dispence.map((item: ImagePickerResponse, index: number) => (
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
        {dispence.length === 0
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
        title={AppString.get().dispenses}
        userName={props.user?.firstName}
      />
      <View style={styles.contentWrapper}>
        <AppText fontType="paragraph_2" style={styles.label}>
          {AppString.get().takePicture}
        </AppText>
        <View style={styles.imagesWrapper}>
          {renderImages()}
          {renderUploadBtn()}
        </View>
      </View>
      <AppButton
        title={AppString.get().update}
        style={styles.button}
        disabled={disabledBtn}
        onPress={onUpdate}
      />

      <UploadModal
        visible={isVisibleModal}
        launchCamera={getFromCamera}
        launchLibrary={getFromLibrary}
        onCancel={setVisibleModal.bind(this, false)}
        title={AppString.get().uploadPrescriptionReceipt}
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

export default DispensesScreen;
