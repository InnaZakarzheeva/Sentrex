import { PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";

import { ApiRequestError } from "../repository/api/ApiManager";

import { DefaultSliceState, RequestErrorView } from "./types";

export const showErrorAction = (
  state: DefaultSliceState,
  action: PayloadAction<RequestErrorView>
) => {
  state.requestError = action.payload;
  state.requestStatus = "failure";
};

export const hideErrorAction = (state: DefaultSliceState) => {
  state.requestError = null;
  state.requestStatus = "idle";
};

export const startRequestAction = (state: DefaultSliceState) => {
  state.requestStatus = "pending";
};

export function* handleApiError(
  error: ApiRequestError,
  actioCreator: PayloadActionCreator<RequestErrorView>
) {
  if (error.statusCode >= 400 && error.statusCode < 500) {
    console.log("Api error client", JSON.stringify(error));
    yield put(
      actioCreator({
        code: error.statusCode,
        message: (error.data.messages as Array<string>).join(`\n`)
      })
    );
  } else {
    console.log("Api error server", JSON.stringify(error));
    yield put(
      actioCreator({
        code: error.statusCode,
        message: "Server error!"
      })
    );
  }
}
