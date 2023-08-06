import { connect } from "react-redux";

import {
  ReduxStore,
  navigateToSignInAction,
  requestSmsCodeForResetPassAsyncAction,
  resetRequestSmsCodeForResetPassStatusAction
} from "../../../../state";

import ResetPasswordPhoneScreen from "./ResetPasswordPhoneScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  requestStatus: state.forgotPassword.requestSmsCodeForResetPassStatus,
  error: state.forgotPassword.requestSmsCodeForResetPassError
});

const mapDispatch: DispatchProps = {
  backToSignIn: () => navigateToSignInAction(),
  requestCode: (phoneNumber: string) =>
    requestSmsCodeForResetPassAsyncAction(phoneNumber),
  resetRequestSmsCodeStatus: () => resetRequestSmsCodeForResetPassStatusAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(ResetPasswordPhoneScreen);
