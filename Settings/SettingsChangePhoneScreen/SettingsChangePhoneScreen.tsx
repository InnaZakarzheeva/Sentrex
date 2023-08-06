import { useKeyboard } from "@react-native-community/hooks";
import React, { useEffect, useState } from "react";
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

const SettingsChangePhoneScreen = (props: Props) => {
  const keyboard = useKeyboard();
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);

  const onCheckCredSuccess = () => {
    props.navigation.navigate("SettingsVerifyPhoneScreen");
    props.hideError();
  };

  const errorVisible = useRequestStatus(
    props.requestStatus,
    onCheckCredSuccess
  );

  useEffect(() => {
    if (password && phoneNumber) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [password, phoneNumber]);

  const onBack = () => {
    props.navigation.goBack();
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangePhoneNumber = (value: string) => {
    setPhoneNumber(value);
  };

  const onContinue = () => {
    props.checkUserCred({
      password,
      phoneNumber
    });
  };

  return (
    <ScreenContainer style={styles.root}>
      <SettingsHeader
        onBack={onBack}
        title={AppString.get().changePhoneNumber}
        step={1}
      />
      <View style={styles.contentWrapper}>
        <AppText fontType="paragraph_1" style={styles.text}>
          {AppString.get().enterPasswordAndNewPhone}
        </AppText>
        <AppInput
          value={password}
          onChangeText={onChangePassword}
          placeholder={AppString.get().yourPassword}
          withClear
          withSecureText
        />
        <AppInput
          value={phoneNumber}
          onChangeText={onChangePhoneNumber}
          placeholder={AppString.get().newMobilePhone}
          withClear
        />
      </View>
      {!keyboard.keyboardShown && (
        <AppButton
          title={AppString.get().confirmAndProceed}
          disabled={disabledBtn}
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

export default SettingsChangePhoneScreen;
