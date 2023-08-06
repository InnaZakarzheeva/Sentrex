import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestErrorView } from "../types";

import { ForgotPasswordState } from "./types";

export const SLICE_NAME = "FORGOT_PASSWORD";

const initialState: ForgotPasswordState = {
  phoneNumber: null,
  code: null,
  newPassword: null,
  newPasswordConfirmation: null,
  requestSmsCodeForResetPassError: null,
  requestSmsCodeForResetPassStatus: "idle",
  requestValidateSmsCodeError: null,
  requestValidateSmsCodeStatus: "idle",
  requestResetPassError: null,
  requestResetPassStatus: "idle"
};

const forgotPasswordSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    savePhoneNumberAction: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      state.requestSmsCodeForResetPassStatus = "success";
      state.requestSmsCodeForResetPassError = null;
    },
    startRequestSmsCodeForResetPassAction: (state) => {
      state.requestSmsCodeForResetPassStatus = "pending";
      state.requestSmsCodeForResetPassError = null;
    },
    showRequestSmsCodeForResetPassErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestSmsCodeForResetPassStatus = "failure";
      state.requestSmsCodeForResetPassError = action.payload;
    },
    resetRequestSmsCodeForResetPassStatusAction: (state) => {
      state.requestSmsCodeForResetPassStatus = "idle";
      state.requestSmsCodeForResetPassError = null;
    },
    saveSmsCodeAction: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
      state.requestValidateSmsCodeStatus = "success";
      state.requestValidateSmsCodeError = null;
    },
    startRequestValidateCodeForResetPassAction: (state) => {
      state.requestValidateSmsCodeStatus = "pending";
      state.requestValidateSmsCodeError = null;
    },
    showRequestValidateCodeForResetPassErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestValidateSmsCodeStatus = "failure";
      state.requestValidateSmsCodeError = action.payload;
    },
    resetRequestValidateCodeForResetPassStatusAction: (state) => {
      state.requestValidateSmsCodeStatus = "idle";
      state.requestValidateSmsCodeError = null;
    },
    startRequestResetPassAction: (state) => {
      state.requestResetPassStatus = "pending";
      state.requestResetPassError = null;
    },
    successRequestResetPassAction: (state) => {
      state.requestResetPassStatus = "success";
      state.phoneNumber = null;
      state.code = null;
      state.newPassword = null;
      state.newPasswordConfirmation = null;
    },
    showRequestResetPassErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestResetPassStatus = "failure";
      state.requestResetPassError = action.payload;
    },
    resetRequestResetPassStatusAction: (state) => {
      state.requestResetPassStatus = "idle";
      state.requestResetPassError = null;
    }
  }
});

export default forgotPasswordSlice;
