import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { BrandsRepository } from "../../repository";
import { handleApiError } from "../utils";
import brandSlice, { SLICE_NAME } from "./Slice";
import { mapBrands, mapBrandSettingsResponse } from "./Mapper";
import navigationSlice from "../navigation/Slice";

export const doSearchAction = createAction<string>(
  `${SLICE_NAME}/doSearchAction`
);

export function* doSearchSaga(action: PayloadAction<string>) {
  yield put(brandSlice.actions.setSearchValueAction(action.payload));
}

export const getBrandsAsyncAction = createAction(
  `${SLICE_NAME}/brandAsyncAction`
);

export function* getBrandsSaga() {
  const {
    startGetBrandsRequestAction,
    showGetBrandsErrorAction,
    setBrandsAction
  } = brandSlice.actions;
  try {
    yield put(startGetBrandsRequestAction());
    const result: AxiosResponse = yield call(BrandsRepository.getBrands);
    const brands = yield mapBrands(result.data);
    yield put(setBrandsAction(brands));
  } catch (error) {
    yield handleApiError(error, showGetBrandsErrorAction);
  }
}

export const getBrandSettingsAsyncAction = createAction<string>(
  `${SLICE_NAME}/getBrandSetting`
);

export function* getBrandSettingsSaga(action: PayloadAction<string>) {
  const {
    startRequestAction,
    showErrorAction,
    successRequestAction
  } = brandSlice.actions;
  const { setStepsAction } = navigationSlice.actions;
  try {
    yield put(startRequestAction());
    const result: AxiosResponse = yield call(
      BrandsRepository.getBrandSettings,
      action.payload
    );

    const mapped = yield mapBrandSettingsResponse(result);

    yield put(successRequestAction(mapped.allowCaregiver));
    yield put(setStepsAction(mapped.steps));
  } catch (error) {
    yield handleApiError(error, showErrorAction);
  }
}
