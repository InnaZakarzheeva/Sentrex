import { connect, ConnectedProps } from "react-redux";

import { ReduxStore } from "../../state";
import RootNavigator from "./RootNavigator";

interface StateProps {
  splashShown: boolean;
  userRegistered: boolean;
  userLoggedIn: boolean;
  additionalStepsPassed: boolean;
  userForgotPassword: boolean;
}

const mapState = (state: ReduxStore): StateProps => ({
  splashShown: state.navigation.splashShown,
  userRegistered: state.navigation.userRegistered,
  userLoggedIn: state.navigation.userLoggedIn,
  additionalStepsPassed: state.navigation.additionalStepsPassed,
  userForgotPassword: state.navigation.userForgotPassword
});

export type Props = ConnectedProps<typeof connector>;
export const connector = connect(mapState);
export default connector(RootNavigator);
