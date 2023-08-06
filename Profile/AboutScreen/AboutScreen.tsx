import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { AppString } from "../../../../resources";
import { Gender } from "../../../../state";
import {
  AppButton,
  AppInput,
  AppPicker,
  AppText,
  BlockedLoader,
  DatePicker,
  PickerItemView,
  ProfileHeader,
  RequestStatusModal,
  ScreenContainer
} from "../../../components";
import { useRequestStatus } from "../../hooks";
import { styles } from "./styles";
import Props from "./types";
import _ from "lodash";

const GENDERS: PickerItemView<Gender>[] = [
  { type: "Male", title: AppString.get().male },
  { type: "Female", title: AppString.get().female },
  { type: "Other", title: AppString.get().other }
];

const AboutScreen = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<undefined | Gender>(undefined);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [prescriber, setPrescriber] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);

  const onSuccessGetInfo = () => {
    props.hideError();
    setFirstName(props.patient.firstName);
    setLastName(props.patient.lastName);
    setGender(props.patient.gender);
    setDateOfBirth(props.patient.birthDate);
    setPrescriber(props.patient.prescriberName);
  };

  const onSuccessUpdateInfo = () => {
    props.hideUpdateError();
  };

  const errorVisible = useRequestStatus(props.requestStatus, onSuccessGetInfo);

  const updateErrorVisible = useRequestStatus(
    props.requestUpdateInfoStatus,
    onSuccessUpdateInfo
  );

  useEffect(() => {
    props.getPatientInfo();
  }, []);

  useEffect(() => {
    if (
      !_.isEmpty(firstName) &&
      !_.isEmpty(lastName) &&
      !_.isEmpty(dateOfBirth) &&
      !_.isEmpty(gender) &&
      !_.isEmpty(prescriber) &&
      !_.isEqual(
        {
          firstName,
          lastName,
          gender,
          birthDate: dateOfBirth,
          prescriberName: prescriber
        },
        props.patient
      )
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [firstName, lastName, gender, dateOfBirth, prescriber, props.patient]);

  const onBack = () => {
    props.navigation.goBack();
  };

  const onChangeFirstName = (value: string) => {
    setFirstName(value);
  };

  const onChangeLastName = (value: string) => {
    setLastName(value);
  };

  const onChangeGender = (value: Gender) => {
    setGender(value);
  };

  const onChangeDate = (value: string) => {
    setDateOfBirth(value);
  };

  const onChangePrescriber = (value: string) => {
    setPrescriber(value);
  };

  const onUpdate = () => {
    props.updatePatientInfo({
      firstName,
      lastName,
      gender,
      birthDate: dateOfBirth,
      prescriberName: prescriber
    });
  };

  return (
    <ScreenContainer style={styles.root}>
      <StatusBar
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ProfileHeader
        title={AppString.get().about}
        onBack={onBack}
        userName={props.patient.firstName}
      />
      <View style={styles.contenWrapper}>
        <AppInput
          value={firstName}
          placeholder={AppString.get().firstName}
          onChangeText={onChangeFirstName}
        />
        <AppInput
          value={lastName}
          placeholder={AppString.get().lastName}
          onChangeText={onChangeLastName}
        />
        <AppText fontType="label">{AppString.get().gender}</AppText>
        <AppPicker
          value={gender}
          onChange={onChangeGender}
          columns={3}
          data={GENDERS}
          style={styles.pickerWrapper}
        />
        <DatePicker
          value={dateOfBirth}
          onChangeDate={onChangeDate}
          placeholder={AppString.get().dateOfBirth}
          isUseMaxDate
        />
        <AppInput
          value={prescriber}
          placeholder={AppString.get().prescriberName}
          onChangeText={onChangePrescriber}
        />
      </View>
      <AppButton
        title={AppString.get().update}
        onPress={onUpdate}
        disabled={disabledBtn}
        style={styles.updateBtn}
      />
      <BlockedLoader visible={props.requestStatus === "pending"} />
      <BlockedLoader visible={props.requestUpdateInfoStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={errorVisible}
          message={props.error.message}
          onActionPress={props.hideError}
        />
      )}
      {props.errorUpdateInfo && (
        <RequestStatusModal
          visible={updateErrorVisible}
          message={props.errorUpdateInfo.message}
          onActionPress={props.hideUpdateError}
        />
      )}
    </ScreenContainer>
  );
};

export default AboutScreen;
