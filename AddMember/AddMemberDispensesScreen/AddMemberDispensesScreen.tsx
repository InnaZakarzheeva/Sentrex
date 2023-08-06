import React, { useEffect, useState } from "react";
import { AppString, CloseIconSvg, PlusSvg } from "../../../../resources";
import { Image, Pressable, ScrollView, View } from "react-native";
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
import { FilesPayload, ModalPayload } from "../../../../state";
import { useRequestStatus } from "../../hooks";
import { handlePermission } from "../../../../utils";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse
} from "react-native-image-picker";

const AddMemberDispensesScreen = (props: Props) => {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [dispenses, setDispenses] = useState<Array<FilesPayload>>([]);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [isVisiblePreviewModal, setVisiblePreviewModal] = useState(false);
  const [choosenImage, setChoosenImage] = useState<ModalPayload>();

  const onUploadSuccess = () => {
    props.hideError();
    props.navigation.navigate("AddMemberInsurerScreen");
  };

  const errorVisible = useRequestStatus(props.requestStatus, onUploadSuccess);

  useEffect(() => {
    if (dispenses.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [dispenses]);

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
              setDispenses((result) => [
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
              setDispenses((result) => [
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
    setDispenses(dispenses.filter((item, i) => i !== index));
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
    dispenses.map((item: ImagePickerResponse, index: number) => (
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
        {dispenses.length === 0
          ? AppString.get().addImage
          : AppString.get().addAnotherImage}
      </AppText>
    </Pressable>
  );

  const onContinue = () => {
    props.sendDispenses({
      files: dispenses,
      isMember: true
    });
  };

  const onErrorAction = () => {
    props.hideError();
  };

  const onSkip = () => {
    props.navigation.navigate("AddMemberInsurerScreen");
  };

  return (
    <ScreenContainer style={styles.root}>
      <ProfileHeader
        title={AppString.get().addMembers}
        childRight={<AppText fontType="paragraph_1">4/5</AppText>}
      />
      <View style={styles.contenWrapper}>
        <AppText fontType="subheading_1">{AppString.get().dispenses}</AppText>
        <AppText fontType="paragraph_2" style={styles.label}>
          {AppString.get().takePicture}
        </AppText>
        <ScrollView
          contentContainerStyle={styles.imagesWrapper}
          showsVerticalScrollIndicator={false}>
          {renderImages()}
          {renderUploadBtn()}
        </ScrollView>
        <View style={styles.btnWrapper}>
          <AppButton
            title={AppString.get().skip}
            styleMode="outlined"
            style={styles.button}
            onPress={onSkip}
          />
          <AppButton
            title={AppString.get().saveAndProceed}
            style={styles.button}
            disabled={btnDisabled}
            onPress={onContinue}
          />
        </View>
      </View>
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

      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.requestError && (
        <RequestStatusModal
          visible={errorVisible}
          message={props.requestError.message}
          onActionPress={onErrorAction}
        />
      )}
    </ScreenContainer>
  );
};

export default AddMemberDispensesScreen;
