import { connect } from "react-redux";

import {
  resetRequestChangePhoneAction,
  ReduxStore,
  ChangePhonePayload,
  changePhoneNumberAsyncAction,
  SignInPayload,
  changePhoneRequestAsyncAction,
  resetRequestChangePhoneCheckAction
} from "../../../../state";
import SettingsVerifyPhoneScreen from "./SettingsVerifyPhoneScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  requestStatus: state.auth.requestChangePhoneStatus,
  error: state.auth.requestChangePhoneError,
  resendRequestStatus: state.auth.requestChangePhoneCheckStatus,
  resendError: state.auth.requestChangePhoneCheckError,
  phoneNumber: state.auth.phoneNumber,
  password: state.auth.password
});

const mapDispatch: DispatchProps = {
  changePhoneNumber: (payload: ChangePhonePayload) =>
    changePhoneNumberAsyncAction(payload),
  hideError: () => resetRequestChangePhoneAction(),
  resendCode: (payload: SignInPayload) => changePhoneRequestAsyncAction(payload),
  hideResendError: () => resetRequestChangePhoneCheckAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(SettingsVerifyPhoneScreen);
