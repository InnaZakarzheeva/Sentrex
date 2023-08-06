import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { AppString, ArrowRightSvg } from "../../../../resources";
import {
  AppButton,
  AppInput,
  AppPicker,
  AppText,
  PickerItemView,
  PressebleInput,
  ScreenContainer
} from "../../../components";
import { SettingsHeader } from "../components";

import { styles } from "./styles";
import Props from "./types";

type LANGUAGE_TYPE = "English" | "French";
const LANGUAGES: PickerItemView<LANGUAGE_TYPE>[] = [
  { type: "English", title: AppString.get().english },
  { type: "French", title: AppString.get().french }
];

const SettingsScreen = (props: Props) => {
  const [language, setLanguage] = useState<LANGUAGE_TYPE>("English");

  useEffect(() => {
    props.getEmail();
  }, []);

  const onBack = () => {
    props.navigation.goBack();
  };

  const navigateToChangePhone = () => {
    props.navigation.navigate("SettingsChangePhoneScreen");
  };

  const navigateToChangePassword = () => {
    props.navigation.navigate("SettingsChangePasswordScreen");
  };

  return (
    <ScreenContainer style={styles.root}>
      <SettingsHeader onBack={onBack} title={AppString.get().settings} />
      <View style={styles.contentWrapper}>
        <AppText fontType="subheading_2">
          {AppString.get().language.toUpperCase()}
        </AppText>
        <AppPicker
          value={language}
          data={LANGUAGES}
          onChange={setLanguage}
          columns={2}
          style={styles.picker}
        />
        <AppText fontType="subheading_2" style={styles.label}>
          {AppString.get().account.toUpperCase()}
        </AppText>
        <PressebleInput
          value={props.phoneNumber}
          placeholder={AppString.get().phoneNumber}
          onPress={navigateToChangePhone}
          containerStyle={styles.input}
        />
        <AppInput
          value={props.email}
          editable={false}
          placeholder={AppString.get().email}
        />
        <AppText fontType="subheading_2" style={styles.label}>
          {AppString.get().security.toUpperCase()}
        </AppText>
        <Pressable
          onPress={navigateToChangePassword}
          style={styles.passwordBtn}>
          <AppText fontType="paragraph_1">
            {AppString.get().changePassword}
          </AppText>
          <ArrowRightSvg />
        </Pressable>
      </View>
      <AppButton
        title={AppString.get().updateSettings}
        style={styles.updateBtn}
        disabled={true}
      />
    </ScreenContainer>
  );
};

export default SettingsScreen;
