import { connect, ConnectedProps } from "react-redux";
import { ReduxStore, StepsPayload } from "../../../state";

import AdditionalStepsNavigator from "./AdditionalStepsNavigator";

interface StateProps {
  currentAdditionalScreen: StepsPayload | undefined;
}

const mapState = (state: ReduxStore): StateProps => ({
  currentAdditionalScreen: state.navigation.currentAdditionalScreen
});

export type Props = ConnectedProps<typeof connector>;
export const connector = connect(mapState);

export default connector(AdditionalStepsNavigator);
