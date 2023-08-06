import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { SettingsParamList } from "../../../../navigation";
import { RequestErrorView, RequestStatus } from "../../../../state";

import { connector } from "./index";

type SettingsChangePasswordScreenNavigationProp = StackNavigationProp<
  SettingsParamList,
  "SettingsChangePasswordScreen"
>;

export interface StateProps {
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  validatePassword: (password: string) => void;
  hideError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: SettingsChangePasswordScreenNavigationProp;
}

export default Props;
