import { connect } from "react-redux";

import {
  getCurrentUserSelector,
  ReduxStore,
  sendPatientFilesAsyncAction,
  PatientFilesPayload,
  getPatientFilesAsyncAction,
  FilesType,
  filesByTypeSelector,
  resetRequestGetFilesAction,
  updatePatientFilesAsyncAction,
  UpdateFilesPayload,
  resetRequestUpdateFilesAction
} from "../../../../state";
import HealthCardScreen from "./HealthCardScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  user: getCurrentUserSelector(state),
  requestStatus: state.patientFiles.requestUpdateFilesStatus,
  error: state.patientFiles.requestUpdateFilesError,
  requestGetFilesStatus: state.patientFiles.requestGetFilesStatus,
  getFilesError: state.patientFiles.requestGetFilesError,
  healthCards: filesByTypeSelector(state, "HealthCard")
});

const mapDispatch: DispatchProps = {
  sendHealthCard: (payload: PatientFilesPayload) =>
    sendPatientFilesAsyncAction(payload),
  hideError: () => resetRequestUpdateFilesAction(),
  getFiles: (photoType: FilesType) => getPatientFilesAsyncAction(photoType),
  updateFiles: (payload: UpdateFilesPayload) =>
    updatePatientFilesAsyncAction(payload),
  hideGetFilesError: () => resetRequestGetFilesAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(HealthCardScreen);
