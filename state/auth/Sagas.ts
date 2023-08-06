import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { PatientFilesRepository, AuthRepository } from "../../repository";

import { navigateToSignInAction } from "../navigation";
import { handleApiError } from "../utils";
import {
  AdditionalInfoPayload,
  AddMemberPayload,
  ChangePhonePayload,
  SignInPayload,
  SignUpPayload
} from "./types";
import authSlice, { SLICE_NAME } from "./Slice";
import patientFilesSlice from "../patientFiles/Slice";
import brandSlice from "../brands/Slice";
import {
  mapMemberId,
  mapSignInResponse,
  mapSignUpResponse,
  mapToken
} from "./Mapper";
import navigationSlice from "../navigation/Slice";
import ApiManager from "../../repository/api/ApiManager";
import accountSlice from "../account/Slice";
import {
  memberInfoSelector,
  passwordSelector,
  phoneNumberSelector,
  signUpPayloadSelector
} from "./selectors";
import { getHomeSaga } from "../account/Saga";

export const signInAsyncAction = createAction<SignInPayload>(
  `${SLICE_NAME}/signInAsyncAction`
);

export const logOutAsyncAction = createAction(
  `${SLICE_NAME}/logOutAsyncAction`
);

export function* signInSaga(action: PayloadAction<SignInPayload>) {
  const {
    startRequestSignInAction,
    successRequestSignInAction,
    showErrorSignInAction
  } = authSlice.actions;
  const { setUserAction } = accountSlice.actions;
  const { setStepsAction, setSkippedStepsAction } = navigationSlice.actions;
  try {
    yield put(startRequestSignInAction());

    const result: AxiosResponse = yield call(
      AuthRepository.signIn,
      action.payload.phoneNumber,
      action.payload.password
    );

    const token = yield mapToken(result.data);
    ApiManager.getInstance().setToken(token);

    const data = yield mapSignInResponse(result.data);

    const skipedSteps = yield PatientFilesRepository.getSkippedStepsFromLocalStorage();
    if (skipedSteps) {
      yield put(setSkippedStepsAction(JSON.parse(skipedSteps)));
    }

    yield put(setStepsAction(data.stepsToComplete));
    yield put(successRequestSignInAction());
    yield put(
      setUserAction({
        user: {
          drugBrandCode: data.currentDrugBrandCode,
          patientId: data.patientId,
          phoneNumber: action.payload.phoneNumber
        },
        drugBrandsCodes: []
      })
    );
    AuthRepository.saveTokenToLocalStorage(token);
  } catch (error) {
    yield handleApiError(error, showErrorSignInAction);
  }
}

export function* logOutSaga() {
  const {
    startRequestLogOutAction,
    successRequestLogOutAction,
    showLogOutErrorAction
  } = authSlice.actions;
  const { resetAdditionalStepsSliceAction } = patientFilesSlice.actions;
  const { resetBrandsSliceAction } = brandSlice.actions;
  try {
    yield put(startRequestLogOutAction());
    yield call(AuthRepository.signOut);
    yield put(successRequestLogOutAction());

    yield put(resetAdditionalStepsSliceAction());
    yield put(resetBrandsSliceAction());

    AuthRepository.saveTokenToLocalStorage("");

    yield put(navigateToSignInAction());
  } catch (error) {
    yield handleApiError(error, showLogOutErrorAction);
  }
}

export const isRegisteredUserAsyncAction = createAction<string>(
  `${SLICE_NAME}/isRegisteredUserAsyncAction`
);

export function* isRegisteredUserSaga(action: PayloadAction<string>) {
  const {
    startRequestIsRegisteredAction,
    showRequestIsRegisteredErrorAction,
    successRequestIsRegisteredAction
  } = authSlice.actions;
  try {
    yield put(startRequestIsRegisteredAction());
    yield call(AuthRepository.isRegisteredUser, action.payload);
    yield put(successRequestIsRegisteredAction(action.payload));
  } catch (error) {
    yield handleApiError(error, showRequestIsRegisteredErrorAction);
  }
}

export const requestSmsCodeAsyncAction = createAction(
  `${SLICE_NAME}/requestSmsCodeAsyncAction`
);

export function* requestSmsCodeSaga() {
  const {
    startRequestSmsCodeAction,
    showRequestSmsCodeErrorAction,
    successRequestSmsCodeAction
  } = authSlice.actions;
  try {
    yield put(startRequestSmsCodeAction());
    const number = yield select(phoneNumberSelector);
    yield call(AuthRepository.sendVerificationCode, number);
    yield put(successRequestSmsCodeAction());
  } catch (error) {
    yield handleApiError(error, showRequestSmsCodeErrorAction);
  }
}

export const validateSmsCodeAsyncAction = createAction<string>(
  `${SLICE_NAME}/validateSmsCodeAsyncAction`
);

export function* validateSmsCodeSaga(action: PayloadAction<string>) {
  const {
    startRequestValidateCodeAction,
    showRequestValidateCodeErrorAction,
    successRequestValidateCodeAction
  } = authSlice.actions;
  try {
    yield put(startRequestValidateCodeAction());
    const number = yield select(phoneNumberSelector);
    yield call(AuthRepository.validateVerificationCode, action.payload, number);
    yield put(successRequestValidateCodeAction(action.payload));
  } catch (error) {
    yield handleApiError(error, showRequestValidateCodeErrorAction);
  }
}

export const signUpAsyncAction = createAction<string>(
  `${SLICE_NAME}/signUpAsyncAction`
);

export function* signUpSaga(action: PayloadAction<string>) {
  const {
    startRequestSignUpAction,
    showRequestSignUpErrorAction,
    successRequestSignUpAction
  } = authSlice.actions;
  const { setUserAction } = accountSlice.actions;
  try {
    yield put(startRequestSignUpAction());
    const payload: SignUpPayload = yield select(
      signUpPayloadSelector,
      action.payload
    );

    const result: AxiosResponse = yield call(AuthRepository.signUp, payload);
    const mapped = yield mapSignUpResponse(result.data);
    yield put(
      setUserAction({
        user: {
          drugBrandCode: payload.userDetailsStepDto.drugBrandCode,
          patientId: mapped.patientId,
          phoneNumber: payload.getStartedStepDto.phoneNumber
        },
        drugBrandsCodes: []
      })
    );

    yield put(successRequestSignUpAction());

    ApiManager.getInstance().setToken(mapped.token);
    AuthRepository.saveTokenToLocalStorage(mapped.token);
  } catch (error) {
    yield handleApiError(error, showRequestSignUpErrorAction);
  }
}

export const changePhoneRequestAsyncAction = createAction<SignInPayload>(
  `${SLICE_NAME}/changePhoneRequestAsyncAction`
);

export function* changePhoneRequestSaga(action: PayloadAction<SignInPayload>) {
  const {
    startRequestChangePhoneCheckAction,
    successRequestChangePhoneCheckAction,
    showChangePhoneCheckErrorAction
  } = authSlice.actions;

  try {
    yield put(startRequestChangePhoneCheckAction());

    yield call(AuthRepository.changePhoneRequest, action.payload);

    yield put(successRequestChangePhoneCheckAction(action.payload));
  } catch (error) {
    yield handleApiError(error, showChangePhoneCheckErrorAction);
  }
}

export const changePhoneNumberAsyncAction = createAction<ChangePhonePayload>(
  `${SLICE_NAME}/changePhoneNumberAsyncAction`
);

export function* changePhoneNumberSaga(
  action: PayloadAction<ChangePhonePayload>
) {
  const {
    startRequestChangePhoneAction,
    successRequestChangePhoneAction,
    showChangePhoneErrorAction
  } = authSlice.actions;

  try {
    yield put(startRequestChangePhoneAction());

    yield call(AuthRepository.changePhoneNumber, action.payload);

    yield put(successRequestChangePhoneAction());
  } catch (error) {
    yield handleApiError(error, showChangePhoneErrorAction);
  }
}

export const validatePasswordAsyncAction = createAction<string>(
  `${SLICE_NAME}/validatePasswordAsyncAction`
);

export function* validatePasswordSaga(action: PayloadAction<string>) {
  const {
    startRequestValidatePasswordAction,
    successRequestValidatePasswordAction,
    showValidatePasswordErrorAction
  } = authSlice.actions;

  try {
    yield put(startRequestValidatePasswordAction());

    yield call(AuthRepository.validatePassword, action.payload);

    yield put(successRequestValidatePasswordAction(action.payload));
  } catch (error) {
    yield handleApiError(error, showValidatePasswordErrorAction);
  }
}

export const changePasswordAsyncAction = createAction<string>(
  `${SLICE_NAME}/changePasswordAsyncAction`
);

export function* changePasswordSaga(action: PayloadAction<string>) {
  const {
    startRequestChangePasswordAction,
    successRequestChangePasswordAction,
    showChangePasswordErrorAction
  } = authSlice.actions;

  const oldPassword = yield select(passwordSelector);

  try {
    yield put(startRequestChangePasswordAction());

    yield call(AuthRepository.changePassword, {
      oldPassword,
      newPassword: action.payload,
      newPasswordConfirmation: action.payload
    });

    yield put(successRequestChangePasswordAction());
  } catch (error) {
    yield handleApiError(error, showChangePasswordErrorAction);
  }
}

export const addMemberAsyncAction = createAction<AdditionalInfoPayload>(
  `${SLICE_NAME}/addMemberAsyncAction`
);

export function* addMemberSaga(action: PayloadAction<AdditionalInfoPayload>) {
  const {
    startRequestAddMemberAction,
    successRequestAddMemberAction,
    showRequestAddMemberErrorAction
  } = authSlice.actions;
  const { setMemberIdAction } = accountSlice.actions;
  try {
    yield put(startRequestAddMemberAction());

    const payload: AddMemberPayload = yield select(
      memberInfoSelector,
      action.payload
    );

    const result: AxiosResponse = yield call(AuthRepository.addMember, payload);
    const memberId = yield mapMemberId(result.data);
    yield put(setMemberIdAction(memberId));

    yield getHomeSaga();
    yield put(successRequestAddMemberAction());
  } catch (error) {
    yield handleApiError(error, showRequestAddMemberErrorAction);
  }
}
