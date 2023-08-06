import { connect } from "react-redux";

import {
  authBrandByIdSelector,
  ReduxStore,
  PatientFilesPayload,
  sendPatientFilesAsyncAction,
  resetRequestAddFilesAction
} from "../../../../state";
import AddMemberHealthCardScreen from "./AddMemberHealthCardScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  brand: authBrandByIdSelector(state),
  requestStatus: state.patientFiles.requestStatus,
  error: state.patientFiles.requestError
});

const mapDispatch: DispatchProps = {
  sendHealthCard: (payload: PatientFilesPayload) =>
    sendPatientFilesAsyncAction(payload),
  hideError: () => resetRequestAddFilesAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(AddMemberHealthCardScreen);
