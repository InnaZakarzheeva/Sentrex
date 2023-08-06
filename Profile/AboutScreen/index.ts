import { connect } from "react-redux";

import {
  getPatientInfoAsyncAction,
  PatientPersonalInfoPayload,
  ReduxStore,
  resetRequestPatientInfoAction,
  resetRequestUpdatePatientInfoAction,
  updatePatientInfoAsyncAction
} from "../../../../state";
import AboutScreen from "./AboutScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  patient: state.account.patient,
  requestStatus: state.account.requestPatientInfoStatus,
  error: state.account.requestPatientInfoError,
  requestUpdateInfoStatus: state.account.requestUpdatePatientInfoStatus,
  errorUpdateInfo: state.account.requestUpdatePatientInfoError
});

const mapDispatch: DispatchProps = {
  getPatientInfo: () => getPatientInfoAsyncAction(),
  hideError: () => resetRequestPatientInfoAction(),
  updatePatientInfo: (patient: PatientPersonalInfoPayload) =>
    updatePatientInfoAsyncAction(patient),
  hideUpdateError: () => resetRequestUpdatePatientInfoAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(AboutScreen);
