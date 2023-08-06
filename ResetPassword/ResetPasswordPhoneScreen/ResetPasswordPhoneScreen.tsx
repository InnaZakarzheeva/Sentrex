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
import { useRequestStatus } from "../../hooks";

import { styles } from "./styles";
import Props from "./types";

const ResetPasswordPhoneScreen = (props: Props) => {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboard();
  const [phoneNumber, setPhoneNumber] = useState<undefined | string>(undefined);
  const phoneNumberError = Validator.useError(phoneNumber, "phone_number");
  const [signInBtnDisabled, setSignInBtnDisabled] = useState(true);

  const onRequestCodeSuccess = () => {
    props.resetRequestSmsCodeStatus();
    props.navigation.navigate("ResetPasswordCodeScreen");
  };

  const requestErrorVisible = useRequestStatus(
    props.requestStatus,
    onRequestCodeSuccess
  );

  useEffect(() => {
    if (!_.isEmpty(phoneNumber) && _.isNil(phoneNumberError)) {
      if (signInBtnDisabled) {
        setSignInBtnDisabled(false);
      }
    } else {
      if (!signInBtnDisabled) {
        setSignInBtnDisabled(true);
      }
    }
  }, [phoneNumber, phoneNumberError]);

  const requestCode = () => {
    if (!_.isNil(phoneNumber)) {
      props.requestCode(phoneNumber);
    }
  };

  const onPhoneNumberChanged = (text: string) => {
    setPhoneNumber(text);
  };

  const onErrorAction = () => {
    props.resetRequestSmsCodeStatus();
  };

  return (
    <>
      <ScreenBg />
      <View style={rootContainer(insets, keyboard.keyboardShown)}>
        <SignUpHeader
          onPress={props.backToSignIn}
          style={headerStyle(keyboard.keyboardShown)}
          currentPage={1}
          pageNumber={3}
        />
        <View style={styles.contentContainer}>
          <AppText fontType="subheading_1">
            {AppString.get().resetPassword}
          </AppText>
          <AppText fontType="paragraph_2" style={styles.label}>
            {AppString.get().enterPhoneNumberLabel}
          </AppText>
          <AppInput
            value={phoneNumber}
            onChangeText={onPhoneNumberChanged}
            placeholder={AppString.get().phoneNumber}
            keyboardType="phone-pad"
            errorLabel={phoneNumberError}
          />
        </View>

        {!keyboard.keyboardShown && (
          <AppButton
            title={AppString.get().continue}
            onPress={requestCode}
            style={styles.button}
            disabled={signInBtnDisabled}
          />
        )}
      </View>

      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={requestErrorVisible}
          message={props.error.message}
          onActionPress={onErrorAction}
        />
      )}
    </>
  );
};

export default ResetPasswordPhoneScreen;
