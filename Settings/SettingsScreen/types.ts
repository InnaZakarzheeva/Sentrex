import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { SettingsParamList } from "../../../../navigation";

import { connector } from "./index";

type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsParamList,
  "SettingsScreen"
>;

export interface StateProps {
  phoneNumber: string | undefined;
  email: string | undefined;
}

export interface DispatchProps {
  getEmail: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: SettingsScreenNavigationProp;
}

export default Props;
