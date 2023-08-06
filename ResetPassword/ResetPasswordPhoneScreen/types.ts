import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { ForgotPasswordParamList } from "../../../../navigation";
import { RequestErrorView, RequestStatus } from "../../../../state";

import { connector } from "./index";

type ResetPasswordPhoneScreenNavigationProp = StackNavigationProp<
  ForgotPasswordParamList,
  "ResetPasswordPhoneScreen"
>;

export interface StateProps {
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  backToSignIn: () => void;
  requestCode: (number: string) => void;
  resetRequestSmsCodeStatus: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: ResetPasswordPhoneScreenNavigationProp;
}

export default Props;
