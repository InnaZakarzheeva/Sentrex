import { useKeyboard } from "@react-native-community/hooks";
import _ from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppString } from "../../../../resources";
import {
  AppButton,
  AppInput,
  AppText,
  BlockedLoader,
  RequestStatusModal,
  ScreenBg,
  SignUpHeader
} from "../../../components";
import { headerStyle, rootContainer } from "../../Auth/styles";
import { useRequestStatus } from "../../hooks";

import { styles } from "./styles";
import Props from "./types";

const ResetPasswordCodeScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboard();

  const [smsCode, setSMSCode] = useState("");

  const onRequestValidateCodeSuccess = () => {
    props.resetRequestSmsCodeStatus();
    props.resetValidateCodeRequestStatus();
    props.navigation.navigate("ResetPasswordPassScreen");
  };

  const requestCodeErrorVisible = useRequestStatus(props.requestCodeStatus);

  const requestValidateCodeErrorVisible = useRequestStatus(
    props.requestValidateCodeStatus,
    onRequestValidateCodeSuccess
  );

  const validateCode = () => {
    if (!_.isEmpty(smsCode)) {
      props.validateCode(smsCode);
    }
  };

  const onChangeSMSCode = (value: string) => {
    setSMSCode(value);
  };

  const backToPhoneNumberScreen = () => {
    props.navigation.goBack();
  };

  const onRequestCodeErrorAction = () => {
    props.resetRequestSmsCodeStatus();
  };

  const onValidateCodeErrorAction = () => {
    props.resetValidateCodeRequestStatus();
  };

  return (
    <>
      <ScreenBg />
      <View style={rootContainer(insets, keyboard.keyboardShown)}>
        <SignUpHeader
          onPress={backToPhoneNumberScreen}
          style={headerStyle(keyboard.keyboardShown)}
          currentPage={2}
          pageNumber={3}
        />
        <View style={styles.contentContainer}>
          <AppText fontType="subheading_1">
            {AppString.get().resetPassword}
          </AppText>
          <AppText fontType="paragraph_2" style={styles.label}>
            {AppString.get().enterSmsCodeLabel}
          </AppText>
          <AppInput
            value={smsCode}
            onChangeText={onChangeSMSCode}
            withClear={!_.isEmpty(smsCode)}
            placeholder={AppString.get().smsCode}
            keyboardType="numeric"
          />

          <AppButton
            title={AppString.get().resend}
            styleMode="outlined"
            style={styles.resendBtn}
            onPress={props.requestCode}
          />
        </View>
        {!keyboard.keyboardShown && (
          <AppButton
            title={AppString.get().continue}
            onPress={validateCode}
            style={styles.button}
            disabled={_.isEmpty(smsCode)}
          />
        )}
      </View>

      <BlockedLoader
        visible={
          props.requestCodeStatus === "pending" ||
          props.requestValidateCodeStatus === "pending"
        }
      />
      {props.requestCodeError && (
        <RequestStatusModal
          visible={requestCodeErrorVisible}
          message={props.requestCodeError.message}
          onActionPress={onRequestCodeErrorAction}
        />
      )}
      {props.requestValidateCodeError && (
        <RequestStatusModal
          visible={requestValidateCodeErrorVisible}
          message={props.requestValidateCodeError.message}
          onActionPress={onValidateCodeErrorAction}
        />
      )}
    </>
  );
};

export default ResetPasswordCodeScreen;
