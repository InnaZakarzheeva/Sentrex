import React, { useCallback, useMemo } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";

import {
  AddUserSvg,
  AppString,
  Colors,
  Margins,
  PhoneCallSvg,
  SettingsSvg
} from "../../../resources";
import AppText from "../AppText";
import { AppButton } from "../AppButton";

interface Props {
  visible: boolean;
  onCancel: () => void;
  addMember: () => void;
  openSettings: () => void;
  openHelpModal: () => void;
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
  height: 48 + insents.bottom,
  borderTopWidth: 1,
  borderColor: Colors.inputBorder
});

const SettingsModal = (props: Props) => {
  const insents = useSafeAreaInsets();

  const snapPoints = useMemo(() => [-1, 220 + insents.bottom], []);
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
            <Pressable style={styles.btnWrapper} onPress={props.addMember}>
              <AddUserSvg />
              <AppText fontType="paragraph_1" style={styles.btnLabel}>
                {AppString.get().addMembers}
              </AppText>
            </Pressable>
            <Pressable style={styles.btnWrapper} onPress={props.openSettings}>
              <SettingsSvg />
              <AppText fontType="paragraph_1" style={styles.btnLabel}>
                {AppString.get().settings}
              </AppText>
            </Pressable>
            <Pressable style={styles.btnWrapper} onPress={props.openHelpModal}>
              <PhoneCallSvg />
              <AppText fontType="paragraph_1" style={styles.btnLabel}>
                {AppString.get().help}
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

export default SettingsModal;
