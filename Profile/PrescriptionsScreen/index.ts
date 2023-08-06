import { connect } from "react-redux";

import {
  getCurrentUserSelector,
  ReduxStore,
  sendPatientFilesAsyncAction,
  PatientFilesPayload,
  resetRequestUpdateFilesAction,
  getPatientFilesAsyncAction,
  FilesType,
  filesByTypeSelector,
  updatePatientFilesAsyncAction,
  resetRequestGetFilesAction,
  getBrandByIdSelector,
  UpdateFilesPayload
} from "../../../../state";
import PrescriptionsScreen from "./PrescriptionsScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  user: getCurrentUserSelector(state),
  brand: getBrandByIdSelector(state),
  requestStatus: state.patientFiles.requestUpdateFilesStatus,
  error: state.patientFiles.requestUpdateFilesError,
  requestGetFilesStatus: state.patientFiles.requestGetFilesStatus,
  getFilesError: state.patientFiles.requestGetFilesError,
  prescriptions: filesByTypeSelector(state, "Prescription")
});

const mapDispatch: DispatchProps = {
  sendPrescriptions: (payload: PatientFilesPayload) =>
    sendPatientFilesAsyncAction(payload),
  hideError: () => resetRequestUpdateFilesAction(),
  getFiles: (photoType: FilesType) => getPatientFilesAsyncAction(photoType),
  updateFiles: (payload: UpdateFilesPayload) =>
    updatePatientFilesAsyncAction(payload),
  hideGetFilesError: () => resetRequestGetFilesAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(PrescriptionsScreen);
