import { connect } from "react-redux";
import {
  changePasswordAsyncAction,
  ReduxStore,
  resetRequestChangePasswordAction
} from "../../../../state";

import SettingsCreatePasswordScreen from "./SettingsCreatePasswordScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  requestStatus: state.auth.requestChangePasswordStatus,
  error: state.auth.requestChangePasswordError
});

const mapDispatch: DispatchProps = {
  changePassword: (payload: string) => changePasswordAsyncAction(payload),
  hideError: () => resetRequestChangePasswordAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(SettingsCreatePasswordScreen);
