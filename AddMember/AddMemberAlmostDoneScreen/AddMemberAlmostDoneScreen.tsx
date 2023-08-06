import React, { useEffect, useState } from "react";
import { AppString } from "../../../../resources";
import { View } from "react-native";
import {
  AppButton,
  AppInput,
  AppPicker,
  AppText,
  BlockedLoader,
  PickerItemView,
  PressebleInput,
  ProfileHeader,
  ProvinceModal,
  RequestStatusModal,
  ScreenContainer
} from "../../../components";
import _ from "lodash";
import { styles } from "./styles";
import Props from "./types";
import { useKeyboard } from "@react-native-community/hooks";
import { Gender, ProvinceView } from "../../../../state";
import { useRequestStatus } from "../../hooks";

const GENDERS: PickerItemView<Gender>[] = [
  { type: "Male", title: AppString.get().male },
  { type: "Female", title: AppString.get().female },
  { type: "Other", title: AppString.get().other }
];

const AddMemberAlmostDoneScreen = (props: Props) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [gender, setGender] = useState<undefined | Gender>(props.gender);
  const [doctorsName, setDoctorsName] = useState(props.doctorsName);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const keyboard = useKeyboard();

  const onSuccess = () => {
    props.hideError();
    props.navigation.navigate("AddMemberPrescriptionsScren");
  };

  const errorVisible = useRequestStatus(props.requestStatus, onSuccess);

  useEffect(() => {
    if (
      !_.isEmpty(props.province) &&
      !_.isEmpty(gender) &&
      !_.isEmpty(doctorsName)
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [props.province, gender, doctorsName]);

  const onChangeGender = (value: Gender) => {
    setGender(value);
  };

  const onChangeDoctorsName = (value: string) => {
    setDoctorsName(value);
  };

  const onProvinceSelected = (province: ProvinceView) => {
    setVisibleModal(false);
    props.setProvince(province.key);
  };

  const onContinue = () => {
    props.setAdditionalInfo({
      gender,
      doctorsName
    });
    if (gender) {
      props.addMember({
        gender,
        prescriberName: doctorsName
      });
    }
  };

  return (
    <ScreenContainer style={styles.root}>
      <ProfileHeader
        title={AppString.get().addMembers}
        childRight={<AppText fontType="paragraph_1">3/5</AppText>}
      />
      <View style={styles.contenWrapper}>
        {!keyboard.keyboardShown && (
          <>
            <AppText fontType="subheading_1">
              {AppString.get().almostDone}
            </AppText>
            <AppText fontType="paragraph_1" style={styles.label}>
              {AppString.get().weNeedMoreInfoAboutMember}
            </AppText>
            <PressebleInput
              placeholder={AppString.get().selectYourProvince}
              value={props.province?.displayName}
              onPress={setVisibleModal.bind(this, true)}
            />
            <AppText fontType="label">{AppString.get().gender}</AppText>
            <AppPicker
              value={gender}
              data={GENDERS}
              onChange={onChangeGender}
              columns={3}
              style={styles.pickerWrapper}
            />
          </>
        )}
        <AppText fontType="label">{AppString.get().doctorsName}</AppText>
        <AppText fontType="paragraph_2" style={styles.label}>
          {AppString.get().enterNameOfTheDoctor}
          {props.brand?.name}®
        </AppText>
        <AppInput
          placeholder={AppString.get().doctorsName}
          value={doctorsName}
          onChangeText={onChangeDoctorsName}
        />
      </View>
      {!keyboard.keyboardShown && (
        <AppButton
          title={AppString.get().saveAndProceed}
          onPress={onContinue}
          style={styles.continueBtn}
          disabled={disabledBtn}
        />
      )}
      <ProvinceModal
        visible={isVisibleModal}
        onProvinceSelected={onProvinceSelected}
        onClose={setVisibleModal.bind(this, false)}
        isAddMember
      />
      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={errorVisible}
          message={props.error.message}
          onActionPress={props.hideError}
        />
      )}
    </ScreenContainer>
  );
};

export default AddMemberAlmostDoneScreen;
