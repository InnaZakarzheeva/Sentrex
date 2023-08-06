import Slice from "./Slice";

import {
  getHomeAsyncAction,
  getRegistrationInfoAsyncAction,
  getSettingsInfoAsyncAction,
  getPatientInfoAsyncAction,
  updatePatientInfoAsyncAction
} from "./Saga";

export * from "./types";
export * from "./selectors";

export const {
  setUserAction,
  resetRequestRegistrationInfoAction,
  resetRequestPatientInfoAction,
  resetRequestSettingsInfoAction,
  resetRequestUpdatePatientInfoAction,
  setMemberIdAction,
  setMemberDrugBrandCodeAction
} = Slice.actions;
export {
  getHomeAsyncAction,
  getRegistrationInfoAsyncAction,
  getSettingsInfoAsyncAction,
  getPatientInfoAsyncAction,
  updatePatientInfoAsyncAction
};
