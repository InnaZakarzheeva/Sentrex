import { useKeyboard } from "@react-native-community/hooks";
import React, { useState } from "react";
import { View } from "react-native";
import { AppString } from "../../../../resources";
import {
  AppButton,
  AppInput,
  AppText,
  BlockedLoader,
  RequestStatusModal,
  ScreenContainer
} from "../../../components";
import { useRequestStatus } from "../../hooks";
import { SettingsHeader } from "../components";

import { styles } from "./styles";
import Props from "./types";

const SettingsChangePasswordScreen = (props: Props) => {
  const keyboard = useKeyboard();
  const [password, setPassword] = useState("");

  const onSuccessValidate = () => {
    props.navigation.navigate("SettingsCreatePasswordScreen");
    props.hideError();
  };

  const errorVisible = useRequestStatus(props.requestStatus, onSuccessValidate);

  const onBack = () => {
    props.navigation.goBack();
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onContinue = () => {
    props.validatePassword(password);
  };

  return (
    <ScreenContainer style={styles.root}>
      <SettingsHeader
        onBack={onBack}
        title={AppString.get().changePassword}
        step={1}
      />
      <View style={styles.contentWrapper}>
        <AppText fontType="paragraph_1">
          {AppString.get().enterPasswordToVerify}
        </AppText>
        <AppInput
          value={password}
          onChangeText={onChangePassword}
          placeholder={AppString.get().enterYourPassword}
          withClear
          withSecureText
          containerStyle={styles.input}
        />
      </View>
      {!keyboard.keyboardShown && (
        <AppButton
          title={AppString.get().confirmAndProceed}
          disabled={!password}
          style={styles.continueBtn}
          onPress={onContinue}
        />
      )}
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

export default SettingsChangePasswordScreen;
