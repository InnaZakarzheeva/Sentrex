import { connect } from "react-redux";

import {
  ReduxStore,
  validateSmsCodeForResetPassAsyncAction,
  resetRequestValidateCodeForResetPassStatusAction,
  requestSmsCodeForResetPassAsyncAction,
  resetRequestSmsCodeForResetPassStatusAction
} from "../../../../state";

import ResetPasswordCodeScreen from "./ResetPasswordCodeScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  requestValidateCodeStatus: state.forgotPassword.requestValidateSmsCodeStatus,
  requestValidateCodeError: state.forgotPassword.requestValidateSmsCodeError,
  requestCodeStatus: state.forgotPassword.requestSmsCodeForResetPassStatus,
  requestCodeError: state.forgotPassword.requestSmsCodeForResetPassError
});

const mapDispatch: DispatchProps = {
  validateCode: (code: string) => validateSmsCodeForResetPassAsyncAction(code),
  requestCode: () => requestSmsCodeForResetPassAsyncAction(),
  resetRequestSmsCodeStatus: () =>
    resetRequestSmsCodeForResetPassStatusAction(),
  resetValidateCodeRequestStatus: () =>
    resetRequestValidateCodeForResetPassStatusAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(ResetPasswordCodeScreen);
