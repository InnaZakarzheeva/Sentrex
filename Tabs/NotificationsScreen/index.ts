import { connect } from "react-redux";

import { ReduxStore } from "../../../../state";
import NotificationsScreen from "./NotificationsScreen";
import { StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({});

export const connector = connect(mapState);
export default connector(NotificationsScreen);
