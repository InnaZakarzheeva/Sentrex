import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { ForgotPasswordParamList } from "../../../../navigation";
import { RequestStatus, RequestErrorView } from "../../../../state";

import { connector } from "./index";

type ResetPasswordPassScreenNavigationProp = StackNavigationProp<
  ForgotPasswordParamList,
  "ResetPasswordPassScreen"
>;

export interface StateProps {
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  savePassword: (password: string, confirmPassword: string) => void;
  resetRequestResetPassStatus: () => void;
  navigateToSignIn: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: ResetPasswordPassScreenNavigationProp;
}

export default Props;
