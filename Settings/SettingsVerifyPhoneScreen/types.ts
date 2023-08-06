import { ConnectedProps } from "react-redux";
import {
  ChangePhonePayload,
  RequestErrorView,
  RequestStatus,
  SignInPayload
} from "../../../../state";

import { connector } from "./index";

export interface StateProps {
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
  resendRequestStatus: RequestStatus;
  resendError: RequestErrorView | null;
  phoneNumber: string | undefined;
  password: string;
}

export interface DispatchProps {
  changePhoneNumber: (payload: ChangePhonePayload) => void;
  hideError: () => void;
  resendCode: (payload: SignInPayload) => void;
  hideResendError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default Props;
