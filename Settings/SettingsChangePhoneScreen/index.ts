import { connect } from "react-redux";

import {
  changePhoneRequestAsyncAction,
  ReduxStore,
  SignInPayload,
  resetRequestChangePhoneCheckAction
} from "../../../../state";
import SettingsChangePhoneScreen from "./SettingsChangePhoneScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  requestStatus: state.auth.requestChangePhoneCheckStatus,
  error: state.auth.requestChangePhoneCheckError
});

const mapDispatch: DispatchProps = {
  checkUserCred: (payload: SignInPayload) =>
    changePhoneRequestAsyncAction(payload),
  hideError: () => resetRequestChangePhoneCheckAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(SettingsChangePhoneScreen);
