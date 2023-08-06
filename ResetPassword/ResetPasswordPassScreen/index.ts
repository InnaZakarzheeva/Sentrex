import { connect } from "react-redux";

import {
  ReduxStore,
  resetRequestResetPassStatusAction,
  resetPasswordAsyncAction,
  navigateToSignInAction
} from "../../../../state";

import ResetPasswordPassScreen from "./ResetPasswordPassScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  requestStatus: state.forgotPassword.requestResetPassStatus,
  error: state.forgotPassword.requestResetPassError
});

const mapDispatch: DispatchProps = {
  savePassword: (password: string, confirmPassword: string) =>
    resetPasswordAsyncAction({
      newPasswrod: password,
      newPasswordConfirmation: confirmPassword
    }),
  resetRequestResetPassStatus: () => resetRequestResetPassStatusAction(),
  navigateToSignIn: () => navigateToSignInAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(ResetPasswordPassScreen);
