import React, { useEffect, useState } from "react";
import { Pressable, View, Linking, StatusBar } from "react-native";
import {
  AppString,
  Colors,
  KabiCareSvg,
  KabiLogoSvg,
  WalletSvg
} from "../../../../resources";
import { AccountModalPayload } from "../../../../state";

import {
  AppText,
  BlockedLoader,
  MainHeader,
  RequestStatusModal,
  ScreenContainer,
  ChangeUserModal,
  HelpModal,
  SettingsModal
} from "../../../components";

import { styles } from "./styles";
import Props from "./types";

const HomeScreen = (props: Props) => {
  const [isVisibleSettings, setVisibleSettings] = useState(false);
  const [isVisibleHelpModal, setVisibleHelpModal] = useState(false);
  const [isVisibleUserModal, setVisibleUserModal] = useState(false);
  const [isVisibleBrandModal, setVisibleBrandModal] = useState(false);

  useEffect(() => {
    props.getHome();
    props.getRegistrationInfo();
    props.getProvinces();
  }, []);

  const openLink = () => {
    Linking.openURL("https://www.KabiCare.ca");
  };

  const addMember = () => {
    setVisibleSettings(false);
    props.navigation.navigate("AddMemberNavigator");
  };

  const navigateToSettings = () => {
    setVisibleSettings(false);
    props.navigation.navigate("SettingsNavigator");
  };

  const openHelpModal = () => {
    setVisibleSettings(false);
    setVisibleHelpModal(true);
  };

  const onChangeUser = (user: AccountModalPayload) => {
    props.getRegistrationInfo({
      patientId: user.id,
      drugBrandCode: ""
    });
    setVisibleUserModal(false);
  };

  const onChangeBrand = (brand: AccountModalPayload) => {
    props.getRegistrationInfo({
      patientId: props.user?.id,
      drugBrandCode: brand.id
    });
    setVisibleBrandModal(false);
  };

  const onCall = () => {
    // Linking.openURL(`tel:+1234567890`)
    setVisibleHelpModal(false);
  };

  return (
    <ScreenContainer style={styles.root}>
      <StatusBar
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <MainHeader
        brand={props.brand}
        user={props.user}
        changeUser={setVisibleUserModal.bind(this, true)}
        changeBrand={setVisibleBrandModal.bind(this, true)}
        openSettings={setVisibleSettings.bind(this, true)}
      />
      <View style={styles.welcomeBlock}>
        <AppText fontType="paragraph_1" style={styles.welcomeTitle}>
          {AppString.get().welcomeTo}
        </AppText>
        <KabiCareSvg />
        <View style={styles.welcomeLogo}>
          <KabiLogoSvg size={64} />
        </View>
      </View>
      <AppText fontType="headline_3" style={styles.label}>
        {AppString.get().whatWouldYouLikeToDo}
      </AppText>

      <Pressable style={styles.financialBlock}>
        <WalletSvg />
        <AppText fontType="label" style={styles.financialLabel}>
          {AppString.get().financialAssist}
        </AppText>
      </Pressable>

      <View style={styles.tipWrapper}>
        <AppText fontType="paragraph_2" style={styles.tipsText}>
          {AppString.get().visit}{" "}
          <AppText
            onPress={openLink}
            fontType="subheading_2"
            textColor={Colors.accentTurquoise}>
            www.KabiCare.ca
          </AppText>{" "}
          {AppString.get().toAccessMoreResources}
        </AppText>
        <View style={styles.welcomeLogo}>
          <KabiLogoSvg />
        </View>
      </View>

      <SettingsModal
        visible={isVisibleSettings}
        onCancel={setVisibleSettings.bind(this, false)}
        addMember={addMember}
        openSettings={navigateToSettings}
        openHelpModal={openHelpModal}
      />
      <HelpModal
        visible={isVisibleHelpModal}
        onCancel={setVisibleHelpModal.bind(this, false)}
        onCall={onCall}
      />
      <ChangeUserModal
        visible={isVisibleUserModal}
        data={props.patients}
        onCancel={setVisibleUserModal.bind(this, false)}
        onChange={onChangeUser}
        message={AppString.get().viewingAs}
      />
      <ChangeUserModal
        visible={isVisibleBrandModal}
        data={props.drugBrandsCodes}
        onCancel={setVisibleBrandModal.bind(this, false)}
        onChange={onChangeBrand}
        message={AppString.get().switchTo}
      />
      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={props.requestStatus === "failure"}
          message={props.error.message}
          onActionPress={props.hideError}
        />
      )}
    </ScreenContainer>
  );
};

export default HomeScreen;
