import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  PatientFilesState,
  FilesPayload,
  GetPatientFilesPayload
} from "./types";
import { RequestErrorView } from "../types";

export const SLICE_NAME = "PATIENT_FILES";

export const filesAdapter = createEntityAdapter<FilesPayload>({
  selectId: (brand) => brand.name
});

const initialState: PatientFilesState = {
  requestStatus: "idle",
  requestError: null,
  requestScheduleCallStatus: "idle",
  requestScheduleCallError: null,
  requestGetFilesStatus: "idle",
  requestGetFilesError: null,
  requestDeleteFilesStatus: "idle",
  requestDeleteFilesError: null,
  requestUpdateFilesStatus: "idle",
  requestUpdateFilesError: null
};

const patientFilesSlice = createSlice({
  name: SLICE_NAME,
  initialState: filesAdapter.getInitialState(initialState),
  reducers: {
    startRequestAddFilesAction: (state) => {
      state.requestStatus = "pending";
      state.requestError = null;
    },
    successRequestAddFilesAction: (state) => {
      state.requestStatus = "success";
      state.requestError = null;
    },
    showRequestErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestStatus = "failure";
      state.requestError = action.payload;
    },
    resetRequestAddFilesAction: (state) => {
      state.requestStatus = "idle";
      state.requestError = null;
    },
    startRequestScheduleCallAction: (state) => {
      state.requestScheduleCallStatus = "pending";
      state.requestScheduleCallError = null;
    },
    successRequestScheduleCallAction: (state) => {
      state.requestScheduleCallStatus = "success";
      state.requestScheduleCallError = null;
    },
    showRequestScheduleCallErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestScheduleCallStatus = "failure";
      state.requestScheduleCallError = action.payload;
    },
    resetRequestScheduleCall: (state) => {
      state.requestScheduleCallStatus = "idle";
      state.requestScheduleCallError = null;
    },
    resetAdditionalStepsSliceAction: (state) => {
      state = filesAdapter.getInitialState(initialState);
    },
    startRequestGetFilesAction: (state) => {
      state.requestGetFilesStatus = "pending";
      state.requestGetFilesError = null;
    },
    successRequestGetFilesAction: (
      state,
      action: PayloadAction<GetPatientFilesPayload>
    ) => {
      const files = [];
      for (let i = 0; i < action.payload.files.length; i++) {
        const { id, base64Content, description } = action.payload.files[i];
        files.push({
          id,
          name: id,
          uri: `data:image/jpeg;base64,${base64Content}`,
          description,
          filesType: action.payload.filesType
        });
      }
      filesAdapter.upsertMany(state, files);
      state.requestGetFilesStatus = "success";
      state.requestGetFilesError = null;
    },
    showRequestGetFilesErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestGetFilesStatus = "failure";
      state.requestGetFilesError = action.payload;
    },
    resetRequestGetFilesAction: (state) => {
      state.requestGetFilesStatus = "idle";
      state.requestGetFilesError = null;
    },
    startRequestDeleteFilesAction: (state) => {
      state.requestDeleteFilesStatus = "pending";
      state.requestDeleteFilesError = null;
    },
    successRequestDeleteFilesAction: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      filesAdapter.removeMany(state, action.payload);
      state.requestDeleteFilesStatus = "success";
      state.requestDeleteFilesError = null;
    },
    showRequestDeleteFilesErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestDeleteFilesStatus = "failure";
      state.requestDeleteFilesError = action.payload;
    },
    resetRequestDeleteFilesAction: (state) => {
      state.requestDeleteFilesStatus = "idle";
      state.requestDeleteFilesError = null;
    },
    startRequestUpdateFilesAction: (state) => {
      state.requestUpdateFilesStatus = "pending";
      state.requestUpdateFilesError = null;
    },
    successRequestUpdateFilesAction: (state) => {
      state.requestUpdateFilesStatus = "success";
      state.requestUpdateFilesError = null;
    },
    showRequestUpdateFilesErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestUpdateFilesStatus = "failure";
      state.requestUpdateFilesError = action.payload;
    },
    resetRequestUpdateFilesAction: (state) => {
      state.requestUpdateFilesStatus = "idle";
      state.requestUpdateFilesError = null;
    }
  }
});

export default patientFilesSlice;
