import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { put, call, select } from "redux-saga/effects";
import { handleApiError } from "../utils";
import accountSlice, { SLICE_NAME } from "./Slice";
import AccountRepository from "../../repository/AccountRepository";
import {
  mapAccountInfo,
  mapEmail,
  mapPatientPersonalInfo,
  mapPatients
} from "./Mapper";
import navigationSlice from "../navigation/Slice";
import { userInfoSelector } from "./selectors";
import { mapSteps } from "../navigation/Mapper";
import { PatientPersonalInfoPayload, UserInfoPayload } from "./types";
import _ from "lodash";

export const getHomeAsyncAction = createAction(
  `${SLICE_NAME}/getHomeAsyncAction`
);

export function* getHomeSaga() {
  const {
    startRequestHomeAction,
    successRequestHomeAction,
    showErrorRequestHomeAction
  } = accountSlice.actions;
  try {
    yield put(startRequestHomeAction());

    const result = yield call(AccountRepository.getHome);
    const mapped = yield mapPatients(result.data);
    yield put(successRequestHomeAction(mapped));
  } catch (error) {
    yield handleApiError(error, showErrorRequestHomeAction);
  }
}

export const getRegistrationInfoAsyncAction = createAction<
  UserInfoPayload | undefined
>(`${SLICE_NAME}/getRegistrationInfoAsyncAction`);

export function* getRegistrationInfoSaga(
  action: PayloadAction<UserInfoPayload | undefined>
) {
  const { setStepsAction } = navigationSlice.actions;
  const {
    startRequestRegistrationInfoAction,
    successRequestRegistrationInfoAction,
    showRequestRegistrationInfoErrorAction,
    setUserAction
  } = accountSlice.actions;
  const { drugBrandCode, patientId } = yield select(userInfoSelector);

  try {
    yield put(startRequestRegistrationInfoAction());

    let result = yield call(AccountRepository.getRegistrationInfo, {
      patientId: _.isNil(action.payload?.patientId)
        ? patientId
        : action.payload?.patientId,
      drugBrandCode: _.isNil(action.payload?.drugBrandCode)
        ? drugBrandCode
        : action.payload?.drugBrandCode
    });

    const steps = yield mapSteps(result.data);
    const accountInfo = yield mapAccountInfo(result.data);

    yield put(setStepsAction(steps));
    yield put(setUserAction(accountInfo));
    yield put(successRequestRegistrationInfoAction());
  } catch (error) {
    yield handleApiError(error, showRequestRegistrationInfoErrorAction);
  }
}

export const getSettingsInfoAsyncAction = createAction(
  `${SLICE_NAME}/getSettingsInfoAsyncAction`
);

export function* getSettingsInfoSaga() {
  const {
    startRequestSettingsInfoAction,
    successRequestSettingsInfoAction,
    showRequestSettingsInfoErrorAction
  } = accountSlice.actions;

  try {
    yield put(startRequestSettingsInfoAction());

    let result = yield call(AccountRepository.getSettingsInfo);

    const email = yield mapEmail(result.data);

    yield put(successRequestSettingsInfoAction(email));
  } catch (error) {
    yield handleApiError(error, showRequestSettingsInfoErrorAction);
  }
}

export const getPatientInfoAsyncAction = createAction(
  `${SLICE_NAME}/getPatientInfoAsyncAction`
);

export function* getPatientInfoSaga() {
  const {
    startRequestPatientInfoAction,
    successRequestPatientInfoAction,
    showRequestPatientInfoErrorAction
  } = accountSlice.actions;

  const { patientId } = yield select(userInfoSelector);

  try {
    yield put(startRequestPatientInfoAction());

    let result = yield call(AccountRepository.getPatientInfo, patientId);

    const patient = yield mapPatientPersonalInfo(result.data);

    yield put(successRequestPatientInfoAction(patient));
  } catch (error) {
    yield handleApiError(error, showRequestPatientInfoErrorAction);
  }
}

export const updatePatientInfoAsyncAction = createAction<PatientPersonalInfoPayload>(
  `${SLICE_NAME}/updatePatientInfoAsyncAction`
);

export function* updatePatientInfoSaga(
  action: PayloadAction<PatientPersonalInfoPayload>
) {
  const {
    startRequestUpdatePatientInfoAction,
    successRequestUpdatePatientInfoAction,
    showRequestUpdatePatientInfoErrorAction
  } = accountSlice.actions;

  const { patientId } = yield select(userInfoSelector);

  try {
    yield put(startRequestUpdatePatientInfoAction());

    yield call(AccountRepository.updatePatientInfo, action.payload, patientId);

    yield put(successRequestUpdatePatientInfoAction(action.payload));
  } catch (error) {
    yield handleApiError(error, showRequestUpdatePatientInfoErrorAction);
  }
}
