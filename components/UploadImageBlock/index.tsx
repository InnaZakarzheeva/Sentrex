import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";

import { FilesPayload, ImageType } from "../../../state";
import {
  AppString,
  CloseIconSvg,
  Colors,
  PlusSvg,
  Margins
} from "../../../resources";
import AppText from "../AppText";

const { width } = Dimensions.get("window");

interface Props {
  item: FilesPayload | undefined;
  itemType: ImageType;
  openPhoto: (type: ImageType) => void;
  deletePhoto: (type: ImageType) => void;
  uploadPhoto: (type: ImageType) => void;
}

const styles = StyleSheet.create({
  uploadWrapper: {
    width: width / 2 - Margins.marginBiggest - Margins.marginDefault,
    height: width / 2 - Margins.marginBiggest - Margins.marginDefault,
    backgroundColor: Colors.lightBlue,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBlueBorder,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Margins.marginDefault,
    marginRight: 10
  },
  uploadLabel: {
    color: Colors.accentBlue,
    marginTop: Margins.marginMicro,
    textAlign: "center"
  },
  image: {
    width: width / 2 - Margins.marginBiggest - Margins.marginDefault,
    height: width / 2 - Margins.marginBiggest - Margins.marginDefault,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.inputBorder
  },
  closeWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    borderRadius: 50,
    position: "absolute",
    top: -11,
    right: -11,
    backgroundColor: Colors.white
  }
});

const UploadImageBlock = (props: Props) => {
  const getTitle = () => {
    switch (props.itemType) {
      case "FRONT":
      case "SECONDARY_FRONT":
        return AppString.get().front.toUpperCase();
      case "BACK":
      case "SECONDARY_BACK":
        return AppString.get().back.toUpperCase();
    }
  };

  const getLabel = () => {
    switch (props.itemType) {
      case "FRONT":
      case "SECONDARY_FRONT":
        return AppString.get().addImageFront;
      case "BACK":
      case "SECONDARY_BACK":
        return AppString.get().addImageBack;
    }
  };

  return (
    <View>
      <AppText fontType="label">{getTitle()}</AppText>
      {props.item ? (
        <Pressable
          style={styles.uploadWrapper}
          onPress={props.openPhoto.bind(this, props.itemType)}>
          <Image source={{ uri: props.item.uri }} style={styles.image} />
          <Pressable
            style={styles.closeWrapper}
            onPress={props.deletePhoto.bind(this, props.itemType)}>
            <CloseIconSvg />
          </Pressable>
        </Pressable>
      ) : (
        <Pressable
          style={styles.uploadWrapper}
          onPress={props.uploadPhoto.bind(this, props.itemType)}>
          <PlusSvg />
          <AppText fontType="subheading_2" style={styles.uploadLabel}>
            {getLabel()}
          </AppText>
        </Pressable>
      )}
    </View>
  );
};

export default UploadImageBlock;
