import { useKeyboard } from "@react-native-community/hooks";
import React, { useState } from "react";
import { View } from "react-native";
import { AppString, InfoSvg } from "../../../../resources";
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

const SettingsVerifyPhoneScreen = (props: Props) => {
  const keyboard = useKeyboard();
  const [code, setCode] = useState("");
  const [isVisibleModal, setVisibleModal] = useState(false);

  const onCheckCredSuccess = () => {
    setVisibleModal(true);
    props.hideError();
    props.hideResendError();
  };

  const errorVisible = useRequestStatus(
    props.requestStatus,
    onCheckCredSuccess
  );

  const resendErrorVisible = useRequestStatus(props.resendRequestStatus);

  const onBack = () => {
    props.navigation.goBack();
  };

  const onChangeCode = (value: string) => {
    setCode(value);
  };

  const onContinue = () => {
    if (props.phoneNumber) {
      props.changePhoneNumber({
        code,
        phoneNumber: props.phoneNumber
      });
    }
  };

  const onResend = () => {
    if (props.phoneNumber) {
      props.resendCode({
        password: props.password,
        phoneNumber: props.phoneNumber
      });
    }
  };

  const navigateToHome = () => {
    setVisibleModal(false);
    props.navigation.navigate("HomeScreen");
  };

  const navigateToSettings = () => {
    setVisibleModal(false);
    props.navigation.navigate("SettingsScreen");
  };

  return (
    <ScreenContainer style={styles.root}>
      <SettingsHeader
        onBack={onBack}
        title={AppString.get().changePhoneNumber}
        step={2}
      />
      <View style={styles.contentWrapper}>
        <AppText fontType="subheading_1" style={styles.text}>
          {AppString.get().verifyNewMobilePhone}
        </AppText>
        <AppText fontType="paragraph_2">
          {AppString.get().codeHasBeenSent}
        </AppText>
        <View style={styles.tipsWrapper}>
          <InfoSvg />
          <AppText fontType="paragraph_1" style={styles.phoneLabel}>
            {props.phoneNumber}
          </AppText>
        </View>
        <AppInput
          value={code}
          onChangeText={onChangeCode}
          placeholder={AppString.get().smsCode}
          withClear
        />
        <AppButton
          title={AppString.get().resend}
          onPress={onResend}
          styleMode="outlined"
        />
      </View>
      {!keyboard.keyboardShown && (
        <AppButton
          title={AppString.get().verify}
          disabled={!code}
          style={styles.continueBtn}
          onPress={onContinue}
        />
      )}
      <RequestStatusModal
        visible={isVisibleModal}
        message={AppString.get().youSuccessfullyChangedTo}
        icon="request_success"
        actiontitle={AppString.get().backToHome}
        title={AppString.get().mobileNumberHasBeenChanged}
        canceltitle={AppString.get().backToSettings}
        boldMessage={props.phoneNumber}
        onActionPress={navigateToHome}
        onCancelPress={navigateToSettings}
        buttonsStyle={styles.modalBtnWrapper}
      />
      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={errorVisible}
          message={props.error.message}
          onActionPress={props.hideError}
        />
      )}
      {props.resendError && (
        <RequestStatusModal
          visible={resendErrorVisible}
          message={props.resendError.message}
          onActionPress={props.hideResendError}
        />
      )}
    </ScreenContainer>
  );
};

export default SettingsVerifyPhoneScreen;
