import { ReduxStore } from "../store";
import {
  AdditionalInfoPayload,
  AddMemberPayload,
  SignUpPayload
} from "./types";

export const phoneNumberSelector = (state: ReduxStore) =>
  state.auth.phoneNumber;

export const signUpPayloadSelector = (
  state: ReduxStore,
  password: string
): SignUpPayload => {
  return {
    getStartedStepDto: {
      phoneNumber: state.auth.phoneNumber
    },
    userDetailsStepDto: {
      firstName: state.auth.user.firstName,
      lastName: state.auth.user.lastName,
      birthDate: state.auth.user.dateOfBirth,
      drugBrandCode: state.auth.brandId,
      email: state.auth.user.email
    },
    patientDetailsStepDto:
      state.auth.accountType === "someone"
        ? {
            firstName: state.auth.patient.firstName,
            lastName: state.auth.patient.lastName,
            birthDate: state.auth.patient.dateOfBirth,
            relationship: state.auth.patient.relationship
          }
        : null,
    almostDoneStepDto: {
      province: state.auth.provinceId,
      gender: state.auth.additionalInfo.gender,
      prescriberName: state.auth.additionalInfo.doctorsName
    },
    passwordStepDto: {
      password: password,
      passwordConfirmation: password,
      policyAccepted: true,
      verificationCode: state.auth.verificationCode
    }
  };
};

export const passwordSelector = (state: ReduxStore): string => {
  return state.auth.password as string;
};

export const memberInfoSelector = (
  state: ReduxStore,
  payload: AdditionalInfoPayload
): AddMemberPayload => {
  return {
    firstName: state.auth.patient.firstName,
    lastName: state.auth.patient.lastName,
    birthDate: state.auth.patient.dateOfBirth,
    relationship: state.auth.patient.relationship,
    province: state.auth.provinceId,
    gender: payload.gender,
    prescriberName: payload.prescriberName,
    drugBrandCode: state.account.member.drugBrandCode
  };
};
