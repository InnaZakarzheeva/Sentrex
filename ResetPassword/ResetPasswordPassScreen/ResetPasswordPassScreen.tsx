import { useKeyboard } from "@react-native-community/hooks";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppString } from "../../../../resources";
import { Validator } from "../../../../utils";
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

import { styles } from "./styles";
import Props from "./types";

const ResetPasswordPassScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboard();

  const [password, setPassword] = useState<undefined | string>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>(
    undefined
  );
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const passwordError = Validator.useError(password, "password");

  useEffect(() => {
    if (!_.isEqual(password, confirmPassword) && !_.isNil(confirmPassword)) {
      setConfirmPasswordError(AppString.get().passwordsDoNotMatch);
    } else {
      setConfirmPasswordError(null);
    }
  }, [confirmPassword, confirmPasswordError, password]);

  useEffect(() => {
    if (
      _.isEqual(password, confirmPassword) &&
      !_.isNil(password) &&
      !_.isNil(confirmPassword) &&
      _.isNil(passwordError) &&
      _.isNil(confirmPasswordError)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, confirmPassword, passwordError, confirmPasswordError]);

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const backToCodeScreen = () => {
    props.navigation.goBack();
  };

  const onPressReset = () => {
    if (!_.isNil(password) && !_.isNil(confirmPassword)) {
      props.savePassword(password, confirmPassword);
    }
  };

  const onRequestModalAction = () => {
    if (props.requestStatus === "success") {
      props.navigateToSignIn();
    }
    props.resetRequestResetPassStatus();
  };

  return (
    <>
      <ScreenBg />
      <View style={rootContainer(insets, keyboard.keyboardShown)}>
        <SignUpHeader
          onPress={backToCodeScreen}
          style={headerStyle(keyboard.keyboardShown)}
          currentPage={3}
          pageNumber={3}
        />

        <View style={styles.contentContainer}>
          <AppText fontType="subheading_1">
            {AppString.get().resetPassword}
          </AppText>
          <AppText fontType="paragraph_2" style={styles.label}>
            {AppString.get().passwordShouldBe}
          </AppText>

          <AppInput
            value={password}
            placeholder={AppString.get().createPassword}
            withClear={!_.isEmpty(password)}
            withSecureText
            onChangeText={onChangePassword}
            errorLabel={passwordError}
            containerStyle={styles.topInput}
          />
          <AppInput
            value={confirmPassword}
            placeholder={AppString.get().confirmPassword}
            withClear={!_.isEmpty(confirmPassword)}
            withSecureText
            onChangeText={onChangeConfirmPassword}
            errorLabel={confirmPasswordError}
          />
        </View>

        {!keyboard.keyboardShown && (
          <AppButton
            title={AppString.get().resetPassword}
            onPress={onPressReset}
            style={styles.button}
            disabled={buttonDisabled}
          />
        )}
      </View>

      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          icon="not_allowed"
          visible={props.requestStatus === "failure"}
          message={props.error.message}
          onActionPress={onRequestModalAction}
        />
      )}

      {props.requestStatus === "success" && (
        <RequestStatusModal
          icon="request_success"
          visible={props.requestStatus === "success"}
          message={AppString.get().passwordUpdated}
          actiontitle={AppString.get().signIn}
          onActionPress={onRequestModalAction}
        />
      )}
    </>
  );
};

export default ResetPasswordPassScreen;
