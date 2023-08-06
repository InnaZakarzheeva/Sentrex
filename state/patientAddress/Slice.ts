import {
  createSlice,
  PayloadAction,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { RequestErrorView } from "..";

import { PatientAddressView, AddressState } from "./types";

export const SLICE_NAME = "PATIENT_ADDRESS";

export const addressAdapter = createEntityAdapter<PatientAddressView>({
  selectId: (address) => address.id
});

export const addressSelectors = addressAdapter.getSelectors();

const initialState: AddressState = {
  requestGetAddressesError: null,
  requestGetAddressesStatus: "idle",
  requestAddAddressError: null,
  requestAddAddressStatus: "idle",
  requestEditAddressError: null,
  requestEditAddressStatus: "idle",
  requestDeleteAddressError: null,
  requestDeleteAddressStatus: "idle"
};

const addressSlice = createSlice({
  name: SLICE_NAME,
  initialState: addressAdapter.getInitialState(initialState),
  reducers: {
    setAddressesAction: (
      state,
      action: PayloadAction<PatientAddressView[]>
    ) => {
      addressAdapter.setAll(state, action.payload);
      state.requestGetAddressesStatus = "success";
      state.requestGetAddressesError = null;
    },
    startRequestGetAddressesAction: (state) => {
      state.requestGetAddressesStatus = "pending";
      state.requestGetAddressesError = null;
    },
    showRequestGetAddressesErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestGetAddressesStatus = "failure";
      state.requestGetAddressesError = action.payload;
    },
    resetRequestGetAddressesStatusAction: (state) => {
      state.requestGetAddressesStatus = "idle";
      state.requestGetAddressesError = null;
    },
    addAddressAction: (state, action: PayloadAction<PatientAddressView>) => {
      addressAdapter.addOne(state, action.payload);
      state.requestAddAddressStatus = "success";
      state.requestAddAddressError = null;
    },
    startRequestAddAddressAction: (state) => {
      state.requestAddAddressStatus = "pending";
      state.requestAddAddressError = null;
    },
    showRequestAddAddressErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestAddAddressStatus = "failure";
      state.requestAddAddressError = action.payload;
    },
    resetRequestAddAddressStatusAction: (state) => {
      state.requestAddAddressStatus = "idle";
      state.requestAddAddressError = null;
    },
    editAddressAction: (state, action: PayloadAction<PatientAddressView>) => {
      addressAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { ...action.payload }
      });
      state.requestEditAddressStatus = "success";
      state.requestEditAddressError = null;
    },
    startRequestEditAddressAction: (state) => {
      state.requestEditAddressStatus = "pending";
      state.requestEditAddressError = null;
    },
    showRequestEditAddressErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestEditAddressStatus = "failure";
      state.requestEditAddressError = action.payload;
    },
    resetRequestEditAddressStatusAction: (state) => {
      state.requestEditAddressStatus = "idle";
      state.requestEditAddressError = null;
    },
    deleteAddressAction: (state, action: PayloadAction<string>) => {
      addressAdapter.removeOne(state, action.payload);
      state.requestDeleteAddressStatus = "success";
      state.requestDeleteAddressError = null;
    },
    startRequestDeleteAddressAction: (state) => {
      state.requestDeleteAddressStatus = "pending";
      state.requestDeleteAddressError = null;
    },
    showRequestDeleteAddressErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestDeleteAddressStatus = "failure";
      state.requestDeleteAddressError = action.payload;
    },
    resetRequestDeleteAddressStatusAction: (state) => {
      state.requestDeleteAddressStatus = "idle";
      state.requestDeleteAddressError = null;
    },
    resetAddressSliceAction: (state) => {
      state = addressAdapter.getInitialState(initialState);
    }
  }
});

export default addressSlice;
