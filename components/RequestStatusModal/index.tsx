import React from "react";
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { AppString, Colors, Component, Margins } from "../../../resources";
import { AppButton } from "../AppButton";
import AppIcon from "../AppIcon";
import { IconNames } from "../AppIcon/types";
import AppText from "../AppText";

interface Props {
  visible: boolean;
  message?: string;
  onActionPress: () => void;
  onDismiss?: () => void;
  actiontitle?: string;
  title?: string;
  icon?: IconNames;
  canceltitle?: string;
  onCancelPress?: () => void;
  boldMessage?: string;
  buttonsStyle?: StyleProp<ViewStyle>;
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
    alignSelf: "center",
    marginHorizontal: Margins.marginBig,
    marginBottom: Margins.marginMiddle,
    textAlign: "center"
  },
  btnWrapper: {
    flexDirection: "row",
    backgroundColor: Colors.grayLight,
    paddingBottom: Margins.marginSmall,
    height: Component.textButtonHeight + Margins.marginSmall
  },
  button: {
    flex: 1,
    borderRadius: 0,
    height: Component.textButtonHeight + Margins.marginSmall
  },
  buttonTitle: { color: Colors.accentBlue },
  cancelTitle: { color: Colors.secondaryTextDark },
  cancelBtn: {
    borderRightWidth: 1,
    borderColor: Colors.inputBorder
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: Margins.marginMiddle,
    marginBottom: Margins.marginSmall
  },
  separator: { height: Margins.marginDefault }
});

const RequestStatusModal = (props: Props) => {
  const btnWrapper = StyleSheet.compose<ViewStyle>(
    styles.btnWrapper,
    props.buttonsStyle
  );

  return (
    <Modal
      presentationStyle="overFullScreen"
      onRequestClose={props.onDismiss}
      visible={props.visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.modalBg}>
        <View style={styles.content}>
          <AppIcon name={props.icon || "not_allowed"} />
          <View style={styles.separator} />
          {props.title && (
            <AppText style={styles.title} fontType="subheading_1">
              {props.title}
            </AppText>
          )}
          <AppText style={styles.message} fontType="paragraph_1">
            {props.message}{" "}
            <AppText fontType="subheading_1">{props.boldMessage}</AppText>
          </AppText>
          <View style={btnWrapper}>
            {props.onCancelPress && (
              <AppButton
                style={[styles.button, styles.cancelBtn]}
                titleStyle={styles.cancelTitle}
                styleMode="text"
                title={props.canceltitle || AppString.get().cancel}
                onPress={props.onCancelPress}
              />
            )}
            <AppButton
              style={styles.button}
              titleStyle={styles.buttonTitle}
              styleMode="text"
              title={props.actiontitle || AppString.get().gotIt}
              onPress={props.onActionPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestStatusModal;
