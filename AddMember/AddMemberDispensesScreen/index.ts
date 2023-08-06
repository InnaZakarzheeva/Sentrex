import { connect } from "react-redux";

import {
  authBrandByIdSelector,
  PatientFilesPayload,
  ReduxStore,
  sendPatientFilesAsyncAction,
  resetRequestAddFilesAction
} from "../../../../state";
import AddMemberDispensesScreen from "./AddMemberDispensesScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  brand: authBrandByIdSelector(state),
  requestStatus: state.patientFiles.requestStatus,
  requestError: state.patientFiles.requestError
});

const mapDispatch: DispatchProps = {
  sendDispenses: (payload: PatientFilesPayload) =>
    sendPatientFilesAsyncAction(payload),
  hideError: () => resetRequestAddFilesAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(AddMemberDispensesScreen);
