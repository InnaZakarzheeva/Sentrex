import {
  createSlice,
  PayloadAction,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { ProvincesState, ProvinceView } from "./types";
import { showErrorAction, hideErrorAction, startRequestAction } from "../utils";

export const SLICE_NAME = "PROVINCES";

export const provinceAdapter = createEntityAdapter<ProvinceView>({
  selectId: (province) => province.key,
  sortComparer: (a, b) => a.displayName.localeCompare(b.displayName)
});

export const provincesSelectors = provinceAdapter.getSelectors();

const initialState: ProvincesState = {
  requestStatus: "idle",
  requestError: null
};

const provincesSlice = createSlice({
  name: SLICE_NAME,
  initialState: provinceAdapter.getInitialState(initialState),
  reducers: {
    successRequestAction: (
      state,
      action: PayloadAction<Array<ProvinceView>>
    ) => {
      provinceAdapter.setAll(state, action.payload);
      state.requestStatus = "success";
      state.requestError = null;
    },
    startRequestAction,
    showErrorAction,
    hideErrorAction,
    resetProvincesSliceAction: (state) => {
      state = provinceAdapter.getInitialState(initialState);
    }
  }
});

export default provincesSlice;
