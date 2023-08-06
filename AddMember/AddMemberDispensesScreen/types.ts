import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { AddMemberParamList, TabsParamList } from "../../../../navigation";
import {
  BrandView,
  RequestStatus,
  RequestErrorView,
  PatientFilesPayload
} from "../../../../state";

import { connector } from "./index";

type AddMemberDispensesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList>,
  StackNavigationProp<AddMemberParamList, "AddMemberDispensesScreen">
>;

export interface StateProps {
  brand: BrandView | undefined;
  requestStatus: RequestStatus;
  requestError: RequestErrorView | null;
}

export interface DispatchProps {
  sendDispenses: (payload: PatientFilesPayload) => void;
  hideError: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: AddMemberDispensesScreenNavigationProp;
}

export default Props;
