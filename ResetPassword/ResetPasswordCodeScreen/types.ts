import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { ForgotPasswordParamList } from "../../../../navigation";
import { RequestErrorView, RequestStatus } from "../../../../state";

import { connector } from "./index";

type ResetPasswordCodeScreenNavigationProp = StackNavigationProp<
  ForgotPasswordParamList,
  "ResetPasswordCodeScreen"
>;

export interface StateProps {
  requestValidateCodeStatus: RequestStatus;
  requestValidateCodeError: RequestErrorView | null;
  requestCodeStatus: RequestStatus;
  requestCodeError: RequestErrorView | null;
}

export interface DispatchProps {
  validateCode: (code: string) => void;
  resetRequestSmsCodeStatus: () => void;
  resetValidateCodeRequestStatus: () => void;
  requestCode: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: ResetPasswordCodeScreenNavigationProp;
}

export default Props;
