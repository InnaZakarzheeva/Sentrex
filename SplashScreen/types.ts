import { ConnectedProps } from "react-redux";

import { connector } from "./index";

export interface StateProps {}

export interface DispatchProps {
  hideSplash: () => void;
}

export type Props = ConnectedProps<typeof connector>;

export default Props;
