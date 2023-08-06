import _ from "lodash";
import React, { useCallback, useEffect } from "react";
import { InteractionManager, StatusBar, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { AppString, Colors } from "../../../../resources";
import {
  AppButton,
  AppIcon,
  AppText,
  BlockedLoader,
  ProfileHeader,
  RequestStatusModal,
  ScreenContainer
} from "../../../components";

import AddressItem from "./components/AddressItem";
import { styles } from "./styles";
import Props from "./types";

const PatientAddressListScreen = (props: Props) => {
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      props.getAllAddresses();
    });
    return () => task.cancel();
  }, []);

  const onDeletePress = useCallback((id: string) => {
    props.deleteAddress(id);
  }, []);

  const onEditPress = useCallback((id: string) => {
    props.navigation.navigate("AddEditPatientAddressScreen", { addressId: id });
  }, []);

  const onAddPress = () => {
    props.navigation.navigate("AddEditPatientAddressScreen");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScreenContainer backgroundColor={Colors.white}>
        <ProfileHeader
          title={AppString.get().yourAddress}
          userName={props.userName}
        />
        <View style={styles.container}>
          <AppText fontType="paragraph_2">
            {AppString.get().selectYourPrimaryAddress}
          </AppText>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {props.allAddresses.map((a) => (
              <AddressItem
                key={a.id}
                address={a}
                onDeletePress={onDeletePress}
                onEditPress={onEditPress}
              />
            ))}
            <View style={styles.addButton}>
              <AppIcon name="circle_plus" />

              <AppButton
                title={AppString.get().addAddress}
                styleMode="text"
                titleStyle={styles.addButtonText}
                onPress={onAddPress}
              />
            </View>
          </ScrollView>
        </View>
      </ScreenContainer>

      <BlockedLoader
        visible={
          props.requestStatusDeleteAddress === "pending" ||
          props.requestStatusGetAddresses === "pending"
        }
      />
      {props.requestErrorGetAddresses && (
        <RequestStatusModal
          visible={props.requestStatusGetAddresses === "failure"}
          message={props.requestErrorGetAddresses.message}
          onActionPress={props.hideGetAddressesError}
        />
      )}
      {props.requestErrorDeleteAddress && (
        <RequestStatusModal
          visible={props.requestStatusDeleteAddress === "failure"}
          message={props.requestErrorDeleteAddress.message}
          onActionPress={props.hideDeleteAddressError}
        />
      )}
    </>
  );
};

export default PatientAddressListScreen;
