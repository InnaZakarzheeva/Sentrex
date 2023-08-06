import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { navigateBack } from "../../navigation";
import { PatientAddressRepository } from "../../repository";

import { handleApiError } from "../utils";
import { userInfoSelector } from "../account/selectors";
import brandSlice, { SLICE_NAME } from "./Slice";
import { mapAddresses, mapAddressTypeToParamAddressType } from "./Mapper";
import { PatientAddressView, PatientAddressPayload } from "./types";

export const getPatientAddressesAsyncAction = createAction(
  `${SLICE_NAME}/getPatientAddressesAsyncAction`
);

export const addPatientAddressAsyncAction = createAction<PatientAddressPayload>(
  `${SLICE_NAME}/addPatientAddressAsyncAction`
);

export const editPatientAddressAsyncAction = createAction<PatientAddressPayload>(
  `${SLICE_NAME}/editPatientAddressAsyncAction`
);

export const deletePatientAddressAsyncAction = createAction<{
  addressId: string;
  fromDetails: boolean;
}>(`${SLICE_NAME}/deletePatientAddressAsyncAction`);

export function* getPatientAddressesSaga() {
  const {
    startRequestGetAddressesAction,
    setAddressesAction,
    showRequestGetAddressesErrorAction
  } = brandSlice.actions;
  try {
    yield put(startRequestGetAddressesAction());

    const currentUser = yield select(userInfoSelector);
    const response: AxiosResponse = yield call(
      PatientAddressRepository.getAddresses,
      currentUser.patientId
    );
    const mapped: PatientAddressView[] = yield mapAddresses(
      response.data.value
    );
    yield put(setAddressesAction(mapped));
  } catch (error) {
    yield handleApiError(error, showRequestGetAddressesErrorAction);
  }
}

export function* addPatientAddressSaga(
  action: PayloadAction<PatientAddressPayload>
) {
  const {
    startRequestAddAddressAction,
    addAddressAction,
    showRequestAddAddressErrorAction
  } = brandSlice.actions;
  try {
    yield put(startRequestAddAddressAction());

    const currentUser = yield select(userInfoSelector);
    const actionPayload = action.payload;
    const payload = {
      street: actionPayload.street,
      city: actionPayload.city,
      province: actionPayload.provinceKey,
      zipCode: actionPayload.postalCode,
      isDefault: actionPayload.isPrimary,
      type: mapAddressTypeToParamAddressType(actionPayload.type),
      patientId: currentUser.patientId
    };
    const response: AxiosResponse = yield call(
      PatientAddressRepository.addAddress,
      payload
    );

    const id = response.data.value;
    yield put(
      addAddressAction({
        id,
        street: actionPayload.street,
        city: actionPayload.city,
        provinceKey: actionPayload.provinceKey,
        postalCode: actionPayload.postalCode,
        isPrimary: actionPayload.isPrimary,
        type: actionPayload.type
      })
    );
    navigateBack();
  } catch (error) {
    yield handleApiError(error, showRequestAddAddressErrorAction);
  }
}

export function* editPatientAddressSaga(
  action: PayloadAction<PatientAddressPayload>
) {
  const {
    startRequestEditAddressAction,
    editAddressAction,
    showRequestEditAddressErrorAction
  } = brandSlice.actions;

  const actionPayload = action.payload;

  try {
    if (actionPayload.id) {
      yield put(startRequestEditAddressAction());

      const payload = {
        street: actionPayload.street,
        city: actionPayload.city,
        province: actionPayload.provinceKey,
        zipCode: actionPayload.postalCode,
        isDefault: actionPayload.isPrimary,
        type: mapAddressTypeToParamAddressType(actionPayload.type),
        addressId: actionPayload.id
      };
      yield call(PatientAddressRepository.editAddress, payload);

      yield put(
        editAddressAction({
          id: actionPayload.id,
          street: actionPayload.street,
          city: actionPayload.city,
          provinceKey: actionPayload.provinceKey,
          postalCode: actionPayload.postalCode,
          isPrimary: actionPayload.isPrimary,
          type: actionPayload.type
        })
      );
      navigateBack();
    }
  } catch (error) {
    yield handleApiError(error, showRequestEditAddressErrorAction);
  }
}

export function* deletePatientAddressSaga(
  action: PayloadAction<{ addressId: string; fromDetails: boolean }>
) {
  const {
    startRequestDeleteAddressAction,
    deleteAddressAction,
    showRequestDeleteAddressErrorAction
  } = brandSlice.actions;
  try {
    yield put(startRequestDeleteAddressAction());

    yield call(
      PatientAddressRepository.deleteAddress,
      action.payload.addressId
    );

    yield put(deleteAddressAction(action.payload.addressId));
    if (action.payload.fromDetails) {
      navigateBack();
    }
  } catch (error) {
    yield handleApiError(error, showRequestDeleteAddressErrorAction);
  }
}
