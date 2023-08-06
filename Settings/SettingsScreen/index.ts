import { connect } from "react-redux";

import { getSettingsInfoAsyncAction, ReduxStore } from "../../../../state";
import SettingsScreen from "./SettingsScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  phoneNumber: state.account.user.phoneNumber,
  email: state.account.user.email
});

const mapDispatch: DispatchProps = {
  getEmail: () => getSettingsInfoAsyncAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(SettingsScreen);
