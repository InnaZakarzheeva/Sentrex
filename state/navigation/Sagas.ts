import { createAction } from "@reduxjs/toolkit";
import { put, select } from "redux-saga/effects";
import { PatientFilesRepository } from "../../repository";
import navigationSlice, { SLICE_NAME } from "./Slice";
import {
  getCurrentScreenSelector,
  getSkippedScreensSelector
} from "./selectors";

export const skipScreenAsyncAction = createAction(
  `${SLICE_NAME}/skipScreenAsyncAction`
);

export function* skipScreenSaga() {
  const { skipScreenAction } = navigationSlice.actions;

  const skippedSteps = yield select(getSkippedScreensSelector);
  const currentScreen = yield select(getCurrentScreenSelector);

  try {
    if (currentScreen) {
      const data = [...skippedSteps, currentScreen];
      PatientFilesRepository.saveSkippedStepsToLocalStorage(
        JSON.stringify(data)
      );
      yield put(skipScreenAction(data));
    }
  } catch (error) {
    console.log(error);
  }
}
