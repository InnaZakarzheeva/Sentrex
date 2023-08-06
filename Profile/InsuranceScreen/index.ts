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
  UpdateFilesPayload,
  updatePatientFilesAsyncAction,
  resetRequestUpdateFilesAction
} from "../../../../state";
import InsuranceScreen from "./InsuranceScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  user: getCurrentUserSelector(state),
  requestStatus: state.patientFiles.requestUpdateFilesStatus,
  error: state.patientFiles.requestUpdateFilesError,
  requestGetFilesStatus: state.patientFiles.requestGetFilesStatus,
  getFilesError: state.patientFiles.requestGetFilesError,
  primaryInsurance: filesByTypeSelector(state, "PrimaryInsurance"),
  secondaryInsurance: filesByTypeSelector(state, "SecondaryInsurance")
});

const mapDispatch: DispatchProps = {
  sendInsurance: (payload: PatientFilesPayload) =>
    sendPatientFilesAsyncAction(payload),
  hideError: () => resetRequestUpdateFilesAction(),
  getFiles: (photoType: FilesType) => getPatientFilesAsyncAction(photoType),
  updateFiles: (payload: UpdateFilesPayload) =>
    updatePatientFilesAsyncAction(payload),
  hideGetFilesError: () => resetRequestGetFilesAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(InsuranceScreen);
