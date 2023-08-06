import { connect } from "react-redux";
import {
  ReduxStore,
  validatePasswordAsyncAction,
  resetRequestValidatePasswordAction
} from "../../../../state";

import SettingsChangePasswordScreen from "./SettingsChangePassword";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  requestStatus: state.auth.requestValidatePasswordStatus,
  error: state.auth.requestValidatePasswordError
});

const mapDispatch: DispatchProps = {
  validatePassword: (password: string) => validatePasswordAsyncAction(password),
  hideError: () => resetRequestValidatePasswordAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(SettingsChangePasswordScreen);
