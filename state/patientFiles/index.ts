import Slice from "./Slice";
import {
  sendPatientFilesAsyncAction,
  scheduleCallAsyncAction,
  getPatientFilesAsyncAction,
  updatePatientFilesAsyncAction
} from "./Sagas";

export * from "./types";
export * from "./selectors";
export const {
  resetRequestAddFilesAction,
  resetRequestScheduleCall,
  resetRequestDeleteFilesAction,
  resetRequestGetFilesAction,
  resetRequestUpdateFilesAction
} = Slice.actions;
export {
  sendPatientFilesAsyncAction,
  scheduleCallAsyncAction,
  getPatientFilesAsyncAction,
  updatePatientFilesAsyncAction
};
