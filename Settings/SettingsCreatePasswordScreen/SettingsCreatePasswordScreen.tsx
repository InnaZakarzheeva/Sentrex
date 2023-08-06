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
import { SettingsHeader } from "../components";
import _ from "lodash";
import { styles } from "./styles";
import Props from "./types";
import { useRequestStatus } from "../../hooks";
import { Validator } from "../../../../utils";

const SettingsChangePasswordScreen = (props: Props) => {
  const keyboard = useKeyboard();
  const [password, setPassword] = useState<undefined | string>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>(
    undefined
  );
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const passwordError = Validator.useError(password, "password");
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!_.isEqual(password, confirmPassword) && !_.isNil(confirmPassword)) {
      setConfirmPasswordError(AppString.get().errorIncorrectPassword);
    } else {
      setConfirmPasswordError(null);
    }
  }, [confirmPassword, confirmPasswordError, password]);

  const onSuccess = () => {
    setVisibleModal(true);
    props.hideError();
  };

  const errorVisible = useRequestStatus(props.requestStatus, onSuccess);

  useEffect(() => {
    if (
      _.isEqual(password, confirmPassword) &&
      _.isNil(passwordError) &&
      _.isNil(confirmPasswordError) &&
      password &&
      confirmPassword
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [password, confirmPassword, passwordError, confirmPasswordError]);

  const onBack = () => {
    props.navigation.goBack();
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const onContinue = () => {
    props.changePassword(password);
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
        title={AppString.get().changePassword}
        step={2}
      />
      <View style={styles.contentWrapper}>
        <AppText fontType="subheading_1">
          {AppString.get().createNewPassword}
        </AppText>
        <AppText fontType="paragraph_1" style={styles.label}>
          {AppString.get().makePasswordLonger}
        </AppText>
        <AppInput
          value={password}
          onChangeText={onChangePassword}
          placeholder={AppString.get().createNewPassword}
          withClear={!_.isEmpty(password)}
          withSecureText
          errorLabel={passwordError}
        />
        <AppInput
          value={confirmPassword}
          onChangeText={onChangeConfirmPassword}
          placeholder={AppString.get().confirmNewPassword}
          withClear={!_.isEmpty(confirmPassword)}
          withSecureText
          errorLabel={confirmPasswordError}
        />
      </View>
      {!keyboard.keyboardShown && (
        <AppButton
          title={AppString.get().createNewPassword}
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
      <RequestStatusModal
        visible={isVisibleModal}
        title={AppString.get().successfullyChangedPassword}
        icon="request_success"
        canceltitle={AppString.get().backToSettings}
        actiontitle={AppString.get().backToHome}
        onCancelPress={navigateToSettings}
        onActionPress={navigateToHome}
        buttonsStyle={styles.btnWrapper}
      />
    </ScreenContainer>
  );
};

export default SettingsChangePasswordScreen;
