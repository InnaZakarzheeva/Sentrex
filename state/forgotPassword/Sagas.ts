import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";

import { ForgotPasswordRepository } from "../../repository";

import { handleApiError } from "../utils";
import slice, { SLICE_NAME } from "./Slice";
import { ResetPasswordPayload } from "./types";
import { forgotPassCodeSelector, forgotPassNumberSelector } from "./selectors";
import _ from "lodash";

export const requestSmsCodeForResetPassAsyncAction = createAction<
  string | undefined
>(`${SLICE_NAME}/requestSmsCodeForResetPassAsyncAction`);

export const validateSmsCodeForResetPassAsyncAction = createAction<string>(
  `${SLICE_NAME}/validateSmsCodeForResetPassAsyncAction`
);

export const resetPasswordAsyncAction = createAction<ResetPasswordPayload>(
  `${SLICE_NAME}/resetPasswordAsyncAction`
);

export function* requestSmsCodeForResetPassSaga(
  action: PayloadAction<string | undefined>
) {
  const {
    startRequestSmsCodeForResetPassAction,
    showRequestSmsCodeForResetPassErrorAction,
    savePhoneNumberAction
  } = slice.actions;
  try {
    yield put(startRequestSmsCodeForResetPassAction());
    const numberFromStore: string = yield select(forgotPassNumberSelector);
    const number = _.isNil(action.payload) ? numberFromStore : action.payload;

    yield call(ForgotPasswordRepository.requestCode, number);
    yield put(savePhoneNumberAction(number));
  } catch (error) {
    yield handleApiError(error, showRequestSmsCodeForResetPassErrorAction);
  }
}

export function* validateSmsCodeForResetPassSaga(
  action: PayloadAction<string>
) {
  const {
    startRequestValidateCodeForResetPassAction,
    saveSmsCodeAction,
    showRequestValidateCodeForResetPassErrorAction
  } = slice.actions;
  try {
    yield put(startRequestValidateCodeForResetPassAction());
    const number = yield select(forgotPassNumberSelector);
    yield call(ForgotPasswordRepository.validateCode, number, action.payload);
    yield put(saveSmsCodeAction(action.payload));
  } catch (error) {
    yield handleApiError(error, showRequestValidateCodeForResetPassErrorAction);
  }
}

export function* resetPasswrodSaga(
  action: PayloadAction<ResetPasswordPayload>
) {
  const {
    startRequestResetPassAction,
    showRequestResetPassErrorAction,
    successRequestResetPassAction
  } = slice.actions;
  try {
    yield put(startRequestResetPassAction());
    const number = yield select(forgotPassNumberSelector);
    const code = yield select(forgotPassCodeSelector);

    yield call(
      ForgotPasswordRepository.resetPassword,
      number,
      code,
      action.payload.newPasswrod,
      action.payload.newPasswordConfirmation
    );
    yield put(successRequestResetPassAction());
  } catch (error) {
    yield handleApiError(error, showRequestResetPassErrorAction);
  }
}
