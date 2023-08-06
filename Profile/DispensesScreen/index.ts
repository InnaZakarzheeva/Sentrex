import { connect } from "react-redux";

import {
  ReduxStore,
  resetRequestAddFilesAction,
  updatePatientFilesAsyncAction,
  userBrandByIdSelector,
  filesByTypeSelector,
  FilesType,
  getPatientFilesAsyncAction,
  UpdateFilesPayload,
  resetRequestGetFilesAction,
  getCurrentUserSelector
} from "../../../../state";

import DispensesScreen from "./DispensesScreen";
import { StateProps, DispatchProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  user: getCurrentUserSelector(state),
  brand: userBrandByIdSelector(state),
  requestStatus: state.patientFiles.requestStatus,
  error: state.patientFiles.requestError,
  requestGetFilesStatus: state.patientFiles.requestGetFilesStatus,
  getFilesError: state.patientFiles.requestGetFilesError,
  dispenses: filesByTypeSelector(state, "Dispense")
});

const mapDispatch: DispatchProps = {
  hideError: () => resetRequestAddFilesAction(),
  updateFiles: (payload: UpdateFilesPayload) =>
    updatePatientFilesAsyncAction(payload),
  getFiles: (photoType: FilesType) => getPatientFilesAsyncAction(photoType),
  hideGetFilesError: () => resetRequestGetFilesAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(DispensesScreen);
