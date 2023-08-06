import React, { useEffect, useState } from "react";
import { View } from "react-native";
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
import Props from "./types";
import { styles } from "./styles";
import { AppString } from "../../../../resources";
import { FilesPayload, ImageType } from "../../../../state";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse
} from "react-native-image-picker";
import { useRequestStatus } from "../../hooks";
import { handlePermission } from "../../../../utils";

const AddMemberHealthCardScreen = (props: Props) => {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [healthCards, setHealthCards] = useState<Array<FilesPayload>>([]);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [isVisiblePreviewModal, setVisiblePreviewModal] = useState(false);
  const [imageType, setImageType] = useState<ImageType | null>(null);
  const [choosenImage, setChoosenImage] = useState<FilesPayload | null>(null);

  const onUploadSuccess = () => {
    props.hideError();
    props.navigation.navigate("HomeScreen");
  };

  const errorVisible = useRequestStatus(props.requestStatus, onUploadSuccess);

  useEffect(() => {
    if (healthCards.length >= 1) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [healthCards]);

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

  const uploadPhoto = (type: ImageType) => {
    setImageType(type);
    setVisibleModal(true);
  };

  const deletePhoto = (type: ImageType) => {
    setHealthCards(healthCards.filter((item) => item.description !== type));
  };

  const openPhoto = (type: ImageType) => {
    const choosenImage = healthCards.filter(
      (item) => item.description === type
    );
    setImageType(type);
    setChoosenImage(choosenImage[0]);
    setVisiblePreviewModal(true);
  };

  const onDelete = () => {
    if (imageType) {
      deletePhoto(imageType);
    }
    setVisiblePreviewModal(false);
  };

  const onSkip = () => {
    props.navigation.navigate("HomeScreen");
  };

  const onContinue = () => {
    props.sendHealthCard({
      files: healthCards,
      isMember: true
    });
  };

  return (
    <ScreenContainer style={styles.root}>
      <ProfileHeader
        title={AppString.get().addMembers}
        childRight={<AppText fontType="paragraph_1">4/5</AppText>}
      />
      <View style={styles.contentWrapper}>
        <AppText fontType="subheading_1">
          {AppString.get().provincialHealthCard}
        </AppText>
        <AppText fontType="paragraph_2" style={styles.label}>
          {AppString.get().uploadImages}
        </AppText>
        <View style={styles.uploaderWrapper}>
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
      </View>
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

      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={errorVisible}
          message={props.error.message}
          onActionPress={props.hideError}
        />
      )}
    </ScreenContainer>
  );
};

export default AddMemberHealthCardScreen;
