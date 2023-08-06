import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AppString,
  ArrowBackSvg,
  Colors,
  Margins,
  TrashSvg
} from "../../../resources";
import AppText from "../AppText";

const { width } = Dimensions.get("screen");

interface Props {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  image: string | undefined;
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center"
  },
  image: {
    width,
    height: 375
  }
});

const header = (insents: EdgeInsets): ViewStyle => ({
  position: "absolute",
  width,
  top: insents.top,
  paddingHorizontal: Margins.marginDefault,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: Margins.marginDefault
});

const PreviewModal = (props: Props) => {
  const insents = useSafeAreaInsets();

  const onDeleteImage = () => {
    props.onDelete();
  };

  return (
    <Modal
      presentationStyle="overFullScreen"
      onRequestClose={props.onCancel}
      visible={props.visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.modalBg}>
        <View style={header(insents)}>
          <Pressable onPress={props.onCancel}>
            <ArrowBackSvg />
          </Pressable>
          <AppText fontType="subheading_2" textColor={Colors.white}>
            {AppString.get().viewPrescription}
          </AppText>
          <Pressable onPress={onDeleteImage}>
            <TrashSvg />
          </Pressable>
        </View>
        {props.image && (
          <Image
            source={{ uri: props.image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </Modal>
  );
};

export default PreviewModal;
