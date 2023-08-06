import React from "react";
import { Modal, StyleSheet, View } from "react-native";

import {
  AppString,
  Colors,
  Component,
  Margins,
  PhoneCallSvg
} from "../../../resources";
import AppText from "../AppText";
import { AppButton } from "../AppButton";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onCall: () => void;
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: Colors.black50,
    justifyContent: "center"
  },
  content: {
    backgroundColor: "white",
    marginHorizontal: Margins.marginBig,
    borderRadius: Margins.marginDefault,
    paddingTop: Margins.marginMiddle,
    overflow: "hidden"
  },
  message: {
    marginHorizontal: Margins.marginDefault,
    marginBottom: Margins.marginMiddle
  },
  button: {
    flex: 1,
    borderRadius: 0
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: Margins.marginMiddle,
    marginBottom: Margins.marginSmall
  },
  btnsWrapper: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.grayLight,
    paddingBottom: Margins.marginSmall,
    height: Component.textButtonHeight + Margins.marginSmall
  },
  cancelBtnTitle: { color: Colors.secondaryTextDark },
  buttonTitle: { color: Colors.accentBlue },
  cancelBtn: {
    borderRightWidth: 1,
    borderColor: Colors.inputBorder
  },
  phoneWrapper: {
    flexDirection: "row",
    paddingHorizontal: Margins.marginDefault,
    marginBottom: Margins.marginBig
  },
  phoneLabel: {
    marginLeft: Margins.marginDefault
  }
});

const HelpModal = (props: Props) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      onRequestClose={props.onCancel}
      visible={props.visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.modalBg}>
        <View style={styles.content}>
          <AppText fontType="subheading_1" style={styles.message}>
            {AppString.get().weAreHereToHelp}
          </AppText>
          <View style={styles.phoneWrapper}>
            <PhoneCallSvg />
            <AppText fontType="paragraph_1" style={styles.phoneLabel}>
              +1234567890
            </AppText>
          </View>
          <View style={styles.btnsWrapper}>
            <AppButton
              style={[styles.button, styles.cancelBtn]}
              titleStyle={styles.cancelBtnTitle}
              styleMode="text"
              title={AppString.get().cancel}
              onPress={props.onCancel}
            />
            <AppButton
              style={styles.button}
              titleStyle={styles.buttonTitle}
              styleMode="text"
              title={AppString.get().call}
              onPress={props.onCall}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HelpModal;
