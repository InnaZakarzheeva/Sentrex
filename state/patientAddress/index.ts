import {
  getPatientAddressesAsyncAction,
  editPatientAddressAsyncAction,
  deletePatientAddressAsyncAction,
  addPatientAddressAsyncAction
} from "./Sagas";
import Slice from "./Slice";

export * from "./selectors";
export * from "./types";
export const {
  resetRequestGetAddressesStatusAction,
  resetRequestDeleteAddressStatusAction,
  resetRequestAddAddressStatusAction,
  resetRequestEditAddressStatusAction
} = Slice.actions;
export {
  getPatientAddressesAsyncAction,
  editPatientAddressAsyncAction,
  deletePatientAddressAsyncAction,
  addPatientAddressAsyncAction
};
