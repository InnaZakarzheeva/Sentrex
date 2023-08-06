import { RequestErrorView, RequestStatus } from "../types";

export interface SignInPayload {
  phoneNumber: string;
  password: string;
}

export interface AuthState {
  phoneNumber: string | undefined;
  brandId: string;
  user: UserView;
  patient: PatientView;
  provinceId: string;
  additionalInfo: AdditionalInfoView;
  verificationCode: string;
  password: string;
  accountType: AccountType | undefined;
  requestIsRegisteredError: RequestErrorView | null;
  requestIsRegisteredStatus: RequestStatus;
  requestSmsCodeStatus: RequestStatus;
  requestSmsCodeError: RequestErrorView | null;
  requestValidateCodeError: RequestErrorView | null;
  requestValidateCodeStatus: RequestStatus;
  requestSignUpError: RequestErrorView | null;
  requestSignUpStatus: RequestStatus;
  requestSignInStatus: RequestStatus;
  requestSignInError: RequestErrorView | null;
  requestLogOutStatus: RequestStatus;
  requestLogOutError: RequestErrorView | null;
  requestChangePhoneCheckStatus: RequestStatus;
  requestChangePhoneCheckError: RequestErrorView | null;
  requestChangePhoneStatus: RequestStatus;
  requestChangePhoneError: RequestErrorView | null;
  requestValidatePasswordStatus: RequestStatus;
  requestValidatePasswordError: RequestErrorView | null;
  requestChangePasswordStatus: RequestStatus;
  requestChangePasswordError: RequestErrorView | null;
  requestAddMemberStatus: RequestStatus;
  requestAddMemberError: RequestErrorView | null;
}

export interface PatientInfoPayload {
  patientId: string;
  currentDrugBrandCode: string;
  drugBrandsCodes: string;
  stepsToComplete: Array<StepsPayload>;
}

interface StepsPayload {
  step: string;
  mandatory: boolean;
}

export interface UserView {
  firstName: string;
  lastName: string;
  email: string | undefined;
  dateOfBirth: string;
}

export interface PatientView {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  relationship: Relationship | undefined;
}

export interface AdditionalInfoView {
  gender: Gender | undefined;
  doctorsName: string;
}

export type Gender = "Male" | "Female" | "Other";

export type Relationship = "Spouse" | "Parent" | "Child" | "Caregiver";

export type AccountType = "myself" | "someone";

export interface SignUpPayload {
  getStartedStepDto: {
    phoneNumber: string | undefined;
  };
  userDetailsStepDto: {
    firstName: string;
    lastName: string;
    birthDate: string;
    drugBrandCode: string;
    email: string | undefined;
  };
  patientDetailsStepDto: PatientDetailsPayload | null;
  almostDoneStepDto: {
    province: string;
    gender: Gender | undefined;
    prescriberName: string;
  };
  passwordStepDto: {
    password: string;
    passwordConfirmation: string;
    policyAccepted: boolean;
    verificationCode: string;
  };
}

interface PatientDetailsPayload {
  firstName: string;
  lastName: string;
  birthDate: string;
  relationship: Relationship | undefined;
}

export interface SignUpResponse {
  token: string;
  patientId: string;
}

export interface ChangePhonePayload {
  phoneNumber: string;
  code: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface AddMemberPayload {
  firstName: string;
  lastName: string;
  birthDate: string;
  relationship: Relationship | undefined;
  province: string;
  gender: Gender | undefined;
  prescriberName: string;
  drugBrandCode: string;
}

export interface AdditionalInfoPayload {
  gender: Gender;
  prescriberName: string;
}
