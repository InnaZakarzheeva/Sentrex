import {
  createSlice,
  PayloadAction,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { BrandsState, BrandView } from "./types";
import { showErrorAction, hideErrorAction, startRequestAction } from "../utils";
import { RequestErrorView } from "../types";

export const SLICE_NAME = "BRANDS";

export const brandsAdapter = createEntityAdapter<BrandView>({
  selectId: (brand) => brand.name
});

export const brandsSelectors = brandsAdapter.getSelectors();

const initialState: BrandsState = {
  requestGetBrandsStatus: "idle",
  requestGetBrandsError: null,
  requestStatus: "idle",
  requestError: null,
  searchValue: "",
  allowCaregiver: true
};

const brandSlice = createSlice({
  name: SLICE_NAME,
  initialState: brandsAdapter.getInitialState(initialState),
  reducers: {
    startGetBrandsRequestAction: (state) => {
      state.requestGetBrandsStatus = "pending";
      state.requestGetBrandsError = null;
    },
    hideGetBrandsErrorAction: (state) => {
      state.requestGetBrandsError = null;
      state.requestGetBrandsStatus = "idle";
    },
    showGetBrandsErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestGetBrandsStatus = "failure";
      state.requestGetBrandsError = action.payload;
    },
    setBrandsAction: (state, action: PayloadAction<Array<BrandView>>) => {
      brandsAdapter.setAll(state, action.payload);
      state.requestGetBrandsStatus = "success";
      state.requestGetBrandsError = null;
    },
    setSearchValueAction: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    startRequestAction,
    showErrorAction,
    hideGetBrandSettingsErrorAction: hideErrorAction,
    successRequestAction: (state, action: PayloadAction<boolean>) => {
      state.allowCaregiver = action.payload;
      state.requestError = null;
      state.requestStatus = "success";
    },
    resetBrandsSliceAction: (state) => {
      state = brandsAdapter.getInitialState(initialState);
    }
  }
});

export default brandSlice;
