import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestErrorView } from "../types";
import {
  AccountState,
  PatientPayload,
  PatientPersonalInfoPayload,
  RegistrationInfoPayload
} from "./types";

export const SLICE_NAME = "ACCOUNT";

const initialState: AccountState = {
  user: {
    drugBrandCode: "",
    patientId: "",
    phoneNumber: "",
    email: ""
  },
  patient: {
    firstName: "",
    lastName: "",
    gender: undefined,
    birthDate: "",
    prescriberName: ""
  },
  member: {
    patientId: "",
    drugBrandCode: ""
  },
  patients: [],
  drugBrandsCodes: [],
  requestHomeStatus: "idle",
  requestHomeError: null,
  requestRegistrationInfoStatus: "idle",
  requestRegistrationInfoError: null,
  requestSettingsInfoStatus: "idle",
  requestSettingsInfoError: null,
  requestPatientInfoStatus: "idle",
  requestPatientInfoError: null,
  requestUpdatePatientInfoStatus: "idle",
  requestUpdatePatientInfoError: null
};

const accountSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<RegistrationInfoPayload>) => {
      state.user = {
        ...state.user,
        ...action.payload.user
      };
      state.drugBrandsCodes = action.payload.drugBrandsCodes;
    },
    startRequestHomeAction: (state) => {
      state.requestHomeStatus = "pending";
      state.requestHomeError = null;
    },
    successRequestHomeAction: (
      state,
      action: PayloadAction<Array<PatientPayload>>
    ) => {
      state.requestHomeStatus = "success";
      state.requestHomeError = null;
      state.patients = action.payload;
    },
    showErrorRequestHomeAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestHomeStatus = "failure";
      state.requestHomeError = action.payload;
    },
    startRequestRegistrationInfoAction: (state) => {
      state.requestRegistrationInfoStatus = "pending";
      state.requestRegistrationInfoError = null;
    },
    successRequestRegistrationInfoAction: (state) => {
      state.requestRegistrationInfoStatus = "success";
      state.requestRegistrationInfoError = null;
    },
    showRequestRegistrationInfoErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestRegistrationInfoStatus = "failure";
      state.requestRegistrationInfoError = action.payload;
    },
    resetRequestRegistrationInfoAction: (state) => {
      state.requestRegistrationInfoStatus = "idle";
      state.requestRegistrationInfoError = null;
    },
    startRequestSettingsInfoAction: (state) => {
      state.requestSettingsInfoStatus = "pending";
      state.requestSettingsInfoError = null;
    },
    successRequestSettingsInfoAction: (
      state,
      action: PayloadAction<string>
    ) => {
      state.requestSettingsInfoStatus = "success";
      state.requestSettingsInfoError = null;
      state.user.email = action.payload;
    },
    showRequestSettingsInfoErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestSettingsInfoStatus = "failure";
      state.requestSettingsInfoError = action.payload;
    },
    resetRequestSettingsInfoAction: (state) => {
      state.requestSettingsInfoStatus = "idle";
      state.requestSettingsInfoError = null;
    },
    startRequestPatientInfoAction: (state) => {
      state.requestPatientInfoStatus = "pending";
      state.requestPatientInfoError = null;
    },
    successRequestPatientInfoAction: (
      state,
      action: PayloadAction<PatientPersonalInfoPayload>
    ) => {
      state.requestPatientInfoStatus = "success";
      state.requestPatientInfoError = null;
      state.patient = action.payload;
    },
    showRequestPatientInfoErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestPatientInfoStatus = "failure";
      state.requestPatientInfoError = action.payload;
    },
    resetRequestPatientInfoAction: (state) => {
      state.requestPatientInfoStatus = "idle";
      state.requestPatientInfoError = null;
    },
    startRequestUpdatePatientInfoAction: (state) => {
      state.requestUpdatePatientInfoStatus = "pending";
      state.requestUpdatePatientInfoError = null;
    },
    successRequestUpdatePatientInfoAction: (
      state,
      action: PayloadAction<PatientPersonalInfoPayload>
    ) => {
      state.requestUpdatePatientInfoStatus = "success";
      state.requestUpdatePatientInfoError = null;
      state.patient = action.payload;
    },
    showRequestUpdatePatientInfoErrorAction: (
      state,
      action: PayloadAction<RequestErrorView>
    ) => {
      state.requestUpdatePatientInfoStatus = "failure";
      state.requestUpdatePatientInfoError = action.payload;
    },
    resetRequestUpdatePatientInfoAction: (state) => {
      state.requestUpdatePatientInfoStatus = "idle";
      state.requestUpdatePatientInfoError = null;
    },
    setMemberDrugBrandCodeAction: (state, action: PayloadAction<string>) => {
      state.member.drugBrandCode = action.payload;
    },
    setMemberIdAction: (state, action: PayloadAction<string>) => {
      state.member.patientId = action.payload;
    }
  }
});

export default accountSlice;
