import React, { useCallback, useMemo } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";

import {
  AppString,
  CameraSvg,
  Colors,
  Component,
  Margins,
  PhoneSvg
} from "../../../resources";
import AppText from "../AppText";
import { AppButton } from "../AppButton";

const CONTENT_HEIGHT = 216;

interface Props {
  visible: boolean;
  launchCamera: () => void;
  launchLibrary: () => void;
  onCancel: () => void;
  title: string;
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: Colors.black50,
    justifyContent: "flex-end"
  },
  content: {
    backgroundColor: "white",
    borderTopLeftRadius: Margins.marginMiddle,
    borderTopRightRadius: Margins.marginMiddle,
    paddingTop: Margins.marginMiddle,
    overflow: "hidden",
    paddingHorizontal: Margins.marginBiggest
  },
  title: {
    marginBottom: Margins.marginMiddle
  },
  btnWrapper: {
    flexDirection: "row",
    marginBottom: Margins.marginMiddle
  },
  btnLabel: {
    marginLeft: Margins.marginDefault,
    color: Colors.neutralDark
  },
  cancelBtnText: {
    color: Colors.secondaryTextDark
  }
});

const cancelBtn = (insents: EdgeInsets) => ({
  marginBottom: insents.bottom
});

const cancelBtnWrapper = (insents: EdgeInsets) => ({
  backgroundColor: Colors.grayLight,
  height: Component.appButtonHeight + insents.bottom,
  borderTopWidth: 1,
  borderColor: Colors.inputBorder
});

const UploadModal = (props: Props) => {
  const insents = useSafeAreaInsets();
  const snapPoints = useMemo(() => [-1, CONTENT_HEIGHT + insents.bottom], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (!index) {
      props.onCancel();
    }
  }, []);

  return (
    <Modal
      presentationStyle="overFullScreen"
      onRequestClose={props.onCancel}
      visible={props.visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.modalBg}>
        <BottomSheet
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.content}>
            <AppText fontType="subheading_1" style={styles.title}>
              {props.title}
            </AppText>
            <Pressable style={styles.btnWrapper} onPress={props.launchCamera}>
              <CameraSvg />
              <AppText fontType="paragraph_1" style={styles.btnLabel}>
                {AppString.get().takePhoto}
              </AppText>
            </Pressable>
            <Pressable style={styles.btnWrapper} onPress={props.launchLibrary}>
              <PhoneSvg />
              <AppText fontType="paragraph_1" style={styles.btnLabel}>
                {AppString.get().uploadFromPhone}
              </AppText>
            </Pressable>
          </View>
          <View style={cancelBtnWrapper(insents)}>
            <AppButton
              title={AppString.get().cancel}
              onPress={props.onCancel}
              styleMode="text"
              titleStyle={styles.cancelBtnText}
              style={cancelBtn(insents)}
            />
          </View>
        </BottomSheet>
      </View>
    </Modal>
  );
};

export default UploadModal;
