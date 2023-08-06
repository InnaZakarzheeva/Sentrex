import React, { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";

import { AppString } from "../../../../resources";
import { AccountModalPayload } from "../../../../state";
import {
  AppText,
  BlockedLoader,
  MainHeader,
  RequestStatusModal,
  ScreenContainer,
  SettingsModal,
  HelpModal,
  ChangeUserModal
} from "../../../components";
import { useRequestStatus } from "../../hooks";

import MenuItem from "./component/MenuItem";
import { styles } from "./styles";
import Props from "./types";

const ProfileScreen = (props: Props) => {
  const requestErrorVisible = useRequestStatus(props.requestStatus);
  const [isVisibleSettings, setVisibleSettings] = useState(false);
  const [isVisibleHelpModal, setVisibleHelpModal] = useState(false);
  const [isVisibleUserModal, setVisibleUserModal] = useState(false);
  const [isVisibleBrandModal, setVisibleBrandModal] = useState(false);

  const navigateToAbout = () => {
    props.navigation.navigate("AboutScreen");
  };

  const navigateToHealthCard = () => {
    props.navigation.navigate("HealthCardScreen");
  };

  const navigateToInsurance = () => {
    props.navigation.navigate("InsuranceScreen");
  };

  const navigateToAddress = () => {
    props.navigation.navigate("PatientAddressListScreen");
  };

  const navigateToPrescription = () => {
    props.navigation.navigate("PrescriptionsScreen");
  };

  const navigateToDispenses = () => {
    props.navigation.navigate("DispensesScreen");
  };

  const navigateToFinAssistance = () => {};
  const navigateToProgram = () => {};
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
      <View style={styles.header}>
        <MainHeader
          brand={props.brand}
          user={props.user}
          changeUser={setVisibleUserModal.bind(this, true)}
          changeBrand={setVisibleBrandModal.bind(this, true)}
          openSettings={setVisibleSettings.bind(this, true)}
        />
        <AppText fontType="subheading_1">{AppString.get().profile}</AppText>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}>
        <MenuItem
          icon="about"
          title={AppString.get().about}
          onPress={navigateToAbout}
        />
        <MenuItem
          icon="health_card"
          title={AppString.get().healthCard}
          onPress={navigateToHealthCard}
        />
        <MenuItem
          icon="insurance"
          title={AppString.get().insurance}
          onPress={navigateToInsurance}
        />
        <MenuItem
          icon="address"
          title={AppString.get().address}
          onPress={navigateToAddress}
        />
        <MenuItem
          icon="prescription"
          title={AppString.get().prescription}
          onPress={navigateToPrescription}
        />
        <MenuItem
          icon="dispenses"
          title={AppString.get().dispenses}
          onPress={navigateToDispenses}
        />
        <MenuItem
          icon="fin_assistance"
          title={AppString.get().financialAssistance}
          onPress={navigateToFinAssistance}
        />
        <MenuItem
          icon="program"
          title={AppString.get().program}
          onPress={navigateToProgram}
        />
        <View style={styles.space}>
          <View style={styles.divider} />
        </View>
        <MenuItem
          icon="log_out"
          title={AppString.get().logOut}
          onPress={props.logOut}
        />
      </ScrollView>

      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={requestErrorVisible}
          message={props.error.message}
          onActionPress={props.resetRequestStatus}
        />
      )}
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
    </ScreenContainer>
  );
};

export default ProfileScreen;
