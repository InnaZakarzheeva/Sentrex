import { createAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import brandSlice, { SLICE_NAME } from "./Slice";
import { handleApiError } from "../utils";
import { ProvinceRepository } from "../../repository";
import { mapProvinces } from "./Mapper";

export const getProvincesAsyncAction = createAction(
  `${SLICE_NAME}/provincesAsyncAction`
);

export function* getProvincesSaga() {
  const {
    startRequestAction,
    showErrorAction,
    successRequestAction
  } = brandSlice.actions;
  try {
    yield put(startRequestAction());

    const result: AxiosResponse = yield call(ProvinceRepository.getProvinces);
    const provinces = yield mapProvinces(result.data);

    yield put(successRequestAction(provinces));
  } catch (error) {
    yield handleApiError(error, showErrorAction);
  }
}
