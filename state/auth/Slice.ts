import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestErrorView } from "../types";
import {
  AccountType,
  AdditionalInfoView,
  AuthState,
  PatientView,
  SignInPayload,
  UserView
} from "./types";

export const SLICE_NAME = "AUTH";

const initialState: AuthState = {
  phoneNumber: undefined,
  brandId: "",
  user: {
    firstName: "",
    lastName: "",
    email: undefined,
    dateOfBirth: ""
  },
  patient: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    relationship: undefined
  },
  provinceId: "",
  additionalInfo: {
    gender: undefined,
    doctorsName: ""
  },
  verificationCode: "",
  password: "",
  accountType: undefined,

  requestIsRegisteredStatus: "idle",
  requestIsRegisteredError: null,
  requestSmsCodeStatus: "idle",
  requestSmsCodeError: null,
  requestValidateCodeStatus: "idle",
  requestValidateCodeError: null,
  requestSignUpStatus: "idle",
  requestSignUpError: null,
  requestSignInStatus: "idle",
  requestSignInError: null,
  requestLogOutStatus: "idle",
  requestLogOutError: null,
  requestChangePhoneCheckStatus: "idle",
  requestChangePhoneCheckError: null,
  requestChangePhoneStatus: "idle",
  requestChangePhoneError: null,
  requestValidatePasswordStatus: "idle",
  requestValidatePasswordError: null,
  requestChangePasswordStatus: "idle",
  requestChangePasswordError: null,
  requestAddMemberStatus: "idle",
  requestAddMemberError: null
};

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    successRequestSignInAction: (state) => {
      state.requestSignInStatus = "success";
      state.requestSignInError = null;
    },
    hideSignInErrorAction: (state) => {
      state.requestSignInStatus = "idle";
      state.requestSignInError = null;
    },
    startRequestSignInAction: (state) => {
      state.requestSignInStatus = "pending";
      state.requestSignUpError = null;
    },
    showErrorSignInAction: (state, action: PayloadAction<RequestErrorView>) => {
      state.requestSignInStatus = "failure";
      state.requestSignInError = action.payload;
    },
    setPhoneNumberAction: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setBrandAction: (state, action: PayloadAction<string>) => {
      state.brandId = action.payload;
    },
    setUserInfoAction: (state, action: PayloadAction<UserView>) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.email = action.payload.email;
      state.user.dateOfBirth = action.payload.dateOfBirth;
    },
    setPatientInfoAction: (state, action: PayloadAction<PatientView>) => {
      state.patient.firstName = action.payload.firstName;
      state.patient.lastName = action.payload.lastName;
      state.patient.dateOfBirth = action.payload.dateOfBirth;
      state.patient.relationship = action.payload.relationship;
    },
    setProvinceAction: (state, action: PayloadAction<string>) => {
      state.provinceId = action.payload;
    },
    setAddionInfoAction: (state, action: PayloadAction<AdditionalInfoView>) => {
      state.additionalInfo.gender = action.payload.gender;
      state.additionalInfo.doctorsName = action.payload.doctorsName;
    },
    setPasswordAction: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAccountTypeAction: (state, action: PayloadAction<AccountType>) => {
      state.accountType = action.payload;
    },
    startRequestIsRegisteredAction: (state) => {
      state.requestIsRegisteredStatus = "pending";
      state.requestIsRegisteredError = null;
    },
    successRequestIsRegisteredAction: (
      state,
      action: PayloadAction<string>
    ) => {
      state.phoneNumber = action.payload;
      state.requestIsRegisteredStatus = "success";
      state.requestIsRegisteredError = null;
    },
    showRequestIsRegisteredErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestIsRegisteredStatus = "failure";
      state.requestIsRegisteredError = action.payload;
    },
    resetRequestIsRegisteredStatusAction: (state) => {
      state.requestIsRegisteredStatus = "idle";
      state.requestIsRegisteredError = null;
    },
    startRequestSmsCodeAction: (state) => {
      state.requestSmsCodeStatus = "pending";
      state.requestSmsCodeError = null;
    },
    successRequestSmsCodeAction: (state) => {
      state.requestSmsCodeStatus = "success";
      state.requestSmsCodeError = null;
    },
    showRequestSmsCodeErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestSmsCodeStatus = "failure";
      state.requestSmsCodeError = action.payload;
    },
    resetRequestSmsCodeStatusAction: (state) => {
      state.requestSmsCodeStatus = "idle";
      state.requestSmsCodeError = null;
    },
    startRequestValidateCodeAction: (state) => {
      state.requestValidateCodeStatus = "pending";
      state.requestValidateCodeError = null;
    },
    successRequestValidateCodeAction: (
      state,
      action: PayloadAction<string>
    ) => {
      state.verificationCode = action.payload;
      state.requestValidateCodeStatus = "success";
      state.requestValidateCodeError = null;
    },
    showRequestValidateCodeErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestValidateCodeStatus = "failure";
      state.requestValidateCodeError = action.payload;
    },
    resetRequestValidateCodeStatusAction: (state) => {
      state.requestValidateCodeStatus = "idle";
      state.requestValidateCodeError = null;
    },
    startRequestSignUpAction: (state) => {
      state.requestSignUpStatus = "pending";
      state.requestSignUpError = null;
    },
    successRequestSignUpAction: (state) => {
      state.requestSignUpStatus = "success";
      state.requestSignUpError = null;
    },
    resetRequestSignInAction: (state) => {
      state.requestSignInStatus = "idle";
      state.requestSignInError = null;
    },
    showRequestSignUpErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestSignUpStatus = "failure";
      state.requestSignUpError = action.payload;
    },
    resetRequestSignUpStatusAction: (state) => {
      state.requestSignUpStatus = "idle";
      state.requestSignUpError = null;
    },
    successRequestLogOutAction: (state) => {
      state = initialState;
      state.requestLogOutStatus = "success";
      state.requestLogOutError = null;
    },
    resetRequestLogOutAction: (state) => {
      state.requestLogOutStatus = "idle";
      state.requestLogOutError = null;
    },
    startRequestLogOutAction: (state) => {
      state.requestLogOutStatus = "pending";
      state.requestLogOutError = null;
    },
    showLogOutErrorAction: (state, action: PayloadAction<RequestErrorView>) => {
      state.requestLogOutStatus = "failure";
      state.requestLogOutError = action.payload;
    },
    startRequestChangePhoneCheckAction: (state) => {
      state.requestChangePhoneCheckStatus = "pending";
      state.requestChangePhoneCheckError = null;
    },
    successRequestChangePhoneCheckAction: (
      state,
      action: PayloadAction<SignInPayload>
    ) => {
      state.requestChangePhoneCheckStatus = "success";
      state.requestChangePhoneCheckError = null;
      state.phoneNumber = action.payload.phoneNumber;
      state.password = action.payload.password;
    },
    showChangePhoneCheckErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestChangePhoneCheckStatus = "failure";
      state.requestChangePhoneCheckError = action.payload;
    },
    resetRequestChangePhoneCheckAction: (state) => {
      state.requestChangePhoneCheckStatus = "idle";
      state.requestChangePhoneCheckError = null;
    },
    startRequestChangePhoneAction: (state) => {
      state.requestChangePhoneStatus = "pending";
      state.requestChangePhoneError = null;
    },
    successRequestChangePhoneAction: (state) => {
      state.requestChangePhoneStatus = "success";
      state.requestChangePhoneError = null;
      state.phoneNumber = "";
    },
    showChangePhoneErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestChangePhoneStatus = "failure";
      state.requestChangePhoneError = action.payload;
    },
    resetRequestChangePhoneAction: (state) => {
      state.requestChangePhoneStatus = "idle";
      state.requestChangePhoneError = null;
    },
    startRequestValidatePasswordAction: (state) => {
      state.requestValidatePasswordStatus = "pending";
      state.requestValidatePasswordError = null;
    },
    successRequestValidatePasswordAction: (
      state,
      action: PayloadAction<string>
    ) => {
      state.requestValidatePasswordStatus = "success";
      state.requestValidatePasswordError = null;
      state.password = action.payload;
    },
    showValidatePasswordErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestValidatePasswordStatus = "failure";
      state.requestValidatePasswordError = action.payload;
    },
    resetRequestValidatePasswordAction: (state) => {
      state.requestValidatePasswordStatus = "idle";
      state.requestValidatePasswordError = null;
    },
    startRequestChangePasswordAction: (state) => {
      state.requestChangePasswordStatus = "pending";
      state.requestChangePasswordError = null;
    },
    successRequestChangePasswordAction: (state) => {
      state.requestChangePasswordStatus = "success";
      state.requestChangePasswordError = null;
      state.password = "";
    },
    showChangePasswordErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestChangePasswordStatus = "failure";
      state.requestChangePasswordError = action.payload;
    },
    resetRequestChangePasswordAction: (state) => {
      state.requestChangePasswordStatus = "idle";
      state.requestChangePasswordError = null;
    },
    startRequestAddMemberAction: (state) => {
      state.requestAddMemberStatus = "pending";
      state.requestAddMemberError = null;
    },
    successRequestAddMemberAction: (state) => {
      state.requestAddMemberStatus = "success";
      state.requestAddMemberError = null;
    },
    showRequestAddMemberErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestAddMemberStatus = "failure";
      state.requestAddMemberError = action.payload;
    },
    resetRequestAddMemberAction: (state) => {
      state.requestAddMemberStatus = "idle";
      state.requestAddMemberError = null;
    }
  }
});

export default authSlice;
