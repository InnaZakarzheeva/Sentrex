import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { SettingsParamList } from "../../../../navigation";
import {
  RequestErrorView,
  RequestStatus,
  SignInPayload
} from "../../../../state";

import { connector } from "./index";

type SettingsChangePhoneScreenNavigationProp = StackNavigationProp<
  SettingsParamList,
  "SettingsChangePhoneScreen"
>;

export interface StateProps {
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  checkUserCred: (payload: SignInPayload) => void;
  hideError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: SettingsChangePhoneScreenNavigationProp;
}

export default Props;
