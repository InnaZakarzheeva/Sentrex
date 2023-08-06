import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useSelector } from "react-redux";

import { AppString, Colors } from "../../../../resources";
import {
  AddressType,
  PatientAddressPayload,
  provinceByIdSelector1,
  ProvinceView,
  ReduxStore
} from "../../../../state";
import {
  AppButton,
  AppInput,
  AppPicker,
  AppText,
  BlockedLoader,
  ImageButton,
  PickerItemView,
  PressebleInput,
  ProfileHeader,
  ProvinceModal,
  RequestStatusModal,
  ScreenContainer
} from "../../../components";

import { styles } from "./styles";
import Props from "./types";

const ADDRESS_TYPES: PickerItemView<AddressType>[] = [
  { type: "home", title: AppString.get().home },
  { type: "work", title: AppString.get().work },
  { type: "other", title: AppString.get().other }
];

const AddEditPatientAddressScreen = (props: Props) => {
  const [street, setStreet] = useState<string | undefined>(
    props.address?.street
  );
  const [city, setCity] = useState<string | undefined>(props.address?.city);
  const [province, setProvince] = useState<ProvinceView | undefined>(undefined);
  const [isProvinceModalVisible, setIsProvinceModalVisible] = useState(false);
  const [postalCode, setPostalCode] = useState<string | undefined>(
    props.address?.postalCode
  );
  const [currentAddressType, setCurrentAddressType] = useState<
    AddressType | undefined
  >(props.address?.type);
  const [isPrimary, setIsPrimary] = useState<boolean>(
    props.address ? props.address.isPrimary : false
  );
  const [saveDisabled, setSaveDisabled] = useState(true);

  const provinceByKey = useSelector((state: ReduxStore) =>
    provinceByIdSelector1(state, props.address ? props.address.provinceKey : "")
  );

  useEffect(() => {
    setProvince(provinceByKey);
  }, [provinceByKey]);

  useEffect(() => {
    const disabled =
      _.isNil(street) ||
      _.isEmpty(street) ||
      _.isNil(city) ||
      _.isEmpty(city) ||
      _.isNil(postalCode) ||
      _.isEmpty(postalCode) ||
      _.isNil(province) ||
      _.isNil(currentAddressType);
    if (disabled !== saveDisabled) {
      setSaveDisabled(disabled);
    }
  }, [street, city, province, postalCode, currentAddressType]);

  const onDeletePress = useCallback(() => {
    if (props.route.params) {
      props.deleteAddress(props.route.params.addressId);
    }
  }, []);

  const onStreetChanged = (text: string) => {
    setStreet(text);
  };

  const onCityChanged = (text: string) => {
    setCity(text);
  };

  const onPostalCodeChanged = (text: string) => {
    setPostalCode(text);
  };

  const onAddressTypeChanged = (addressType: AddressType) => {
    setCurrentAddressType(addressType);
  };

  const onPrimaryAddressPress = () => {
    setIsPrimary((s) => !s);
  };

  const onProvinceSelected = (province: ProvinceView) => {
    setProvince(province);
    setIsProvinceModalVisible(false);
  };

  const openProvinceModal = () => {
    setIsProvinceModalVisible(true);
  };

  const closeProvinceModal = () => {
    setIsProvinceModalVisible(false);
  };

  const onCancelPress = () => {
    props.navigation.goBack();
  };

  const onSavePress = () => {
    const payload: PatientAddressPayload = {
      id: props.address ? props.address.id : undefined,
      street: street ? street : "",
      city: city ? city : "",
      provinceKey: province ? province.key : "",
      postalCode: postalCode ? postalCode : "",
      isPrimary,
      type: currentAddressType ? currentAddressType : "other"
    };
    if (props.route.params) {
      props.editAddress(payload);
    } else {
      props.addNewAddress(payload);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScreenContainer backgroundColor={Colors.white}>
        <ProfileHeader
          title={
            props.route.params?.addressId
              ? AppString.get().editAddress
              : AppString.get().addAddress
          }
          userName={props.userName}
          childRight={
            props.route.params ? (
              <ImageButton iconName="delete" onPress={onDeletePress} />
            ) : undefined
          }
        />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollviewContent}>
          <AppInput
            placeholder={AppString.get().street}
            value={street}
            onChangeText={onStreetChanged}
            withClear={!_.isEmpty(street)}
          />
          <AppInput
            placeholder={AppString.get().city}
            value={city}
            onChangeText={onCityChanged}
            withClear={!_.isEmpty(city)}
          />
          <PressebleInput
            placeholder={
              province
                ? AppString.get().province
                : AppString.get().selectYourProvince
            }
            value={province?.displayName}
            onPress={openProvinceModal}
          />
          <AppInput
            placeholder={AppString.get().postalCode}
            value={postalCode}
            onChangeText={onPostalCodeChanged}
            withClear={!_.isEmpty(postalCode)}
          />
          <AppText style={styles.addressTypeLabel} fontType="label">
            {AppString.get().addressType}
          </AppText>
          <AppPicker
            data={ADDRESS_TYPES}
            value={currentAddressType}
            onChange={onAddressTypeChanged}
            columns={3}
          />
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={isPrimary}
              onValueChange={setIsPrimary}
              boxType="square"
              onFillColor={Colors.accentTurquoise}
              onCheckColor={Colors.white}
              onTintColor={Colors.accentTurquoise}
              tintColor={Colors.accentTurquoise}
              tintColors={{
                true: Colors.accentTurquoise,
                false: Colors.accentTurquoise
              }}
              onAnimationType="bounce"
              offAnimationType="bounce"
              style={styles.checkBox}
            />
            <AppButton
              titleStyle={{ color: Colors.primaryTextDark }}
              styleMode="text"
              title={AppString.get().primaryAddress}
              onPress={onPrimaryAddressPress}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <AppButton
            style={styles.button}
            title={AppString.get().cancel}
            styleMode="outlined"
            onPress={onCancelPress}
          />
          <View style={styles.buttonsSpace} />
          <AppButton
            disabled={saveDisabled}
            style={styles.button}
            title={AppString.get().save}
            onPress={onSavePress}
          />
        </View>
      </ScreenContainer>

      <BlockedLoader
        visible={
          props.requestStatusAddAddress === "pending" ||
          props.requestStatusEditAddress === "pending" ||
          props.requestStatusDeleteAddress === "pending"
        }
      />
      {props.requestErrorAddAddress && (
        <RequestStatusModal
          visible={props.requestStatusAddAddress === "failure"}
          message={props.requestErrorAddAddress.message}
          onActionPress={props.hideAddAddressError}
        />
      )}
      {props.requestErrorEditAddress && (
        <RequestStatusModal
          visible={props.requestStatusEditAddress === "failure"}
          message={props.requestErrorEditAddress.message}
          onActionPress={props.hideEditAddressError}
        />
      )}
      {props.requestErrorDeleteAddress && (
        <RequestStatusModal
          visible={props.requestStatusDeleteAddress === "failure"}
          message={props.requestErrorDeleteAddress.message}
          onActionPress={props.hideDeleteAddressError}
        />
      )}
      <ProvinceModal
        visible={isProvinceModalVisible}
        onProvinceSelected={onProvinceSelected}
        onClose={closeProvinceModal}
      />
    </>
  );
};

export default AddEditPatientAddressScreen;
