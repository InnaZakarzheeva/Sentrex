import { ConnectedProps } from "react-redux";
import { RequestErrorView, RequestStatus } from "../../../../state";

import { connector } from "./index";

export interface StateProps {
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  changePassword: (payload: string) => void;
  hideError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default Props;
