import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { RootStackParamList, TabsParamList } from "../../../../navigation";
import {
  RequestErrorView,
  RequestStatus,
  BrandView,
  PatientPayload,
  UserInfoPayload,
  AccountModalPayload
} from "../../../../state";

import { connector } from "./index";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, "ProfileScreen">,
  StackNavigationProp<RootStackParamList>
>;

export interface StateProps {
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
  brand: BrandView | undefined;
  user: PatientPayload | undefined;
  patients: Array<AccountModalPayload>;
  drugBrandsCodes: Array<AccountModalPayload>;
}

export interface DispatchProps {
  logOut: () => void;
  resetRequestStatus: () => void;
  getRegistrationInfo: (payload?: UserInfoPayload) => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: ProfileScreenNavigationProp;
}

export default Props;
