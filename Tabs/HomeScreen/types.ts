import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { RootStackParamList, TabsParamList } from "../../../../navigation";
import {
  BrandView,
  AccountModalPayload,
  PatientPayload,
  RequestErrorView,
  RequestStatus,
  UserInfoPayload
} from "../../../../state";

import { connector } from "./index";

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, "HomeScreen">,
  StackNavigationProp<RootStackParamList>
>;

export interface StateProps {
  brand: BrandView | undefined;
  user: PatientPayload | undefined;
  patients: Array<AccountModalPayload>;
  drugBrandsCodes: Array<AccountModalPayload>;
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  getHome: () => void;
  getRegistrationInfo: (payload?: UserInfoPayload) => void;
  getProvinces: () => void;
  hideError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: HomeScreenNavigationProp;
}

export default Props;
