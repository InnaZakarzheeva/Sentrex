import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { AddMemberParamList, TabsParamList } from "../../../../navigation";
import {
  AdditionalInfoPayload,
  AdditionalInfoView,
  BrandView,
  Gender,
  ProvinceView,
  RequestErrorView,
  RequestStatus
} from "../../../../state";

import { connector } from "./index";

type AddMemberAlmostDoneScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList>,
  StackNavigationProp<AddMemberParamList, "AddMemberAlmostDoneScreen">
>;

export interface StateProps {
  brand: BrandView | undefined;
  province: ProvinceView | undefined;
  gender: Gender | undefined;
  doctorsName: string;
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  setAdditionalInfo: (info: AdditionalInfoView) => void;
  setProvince: (key: string) => void;
  addMember: (payload: AdditionalInfoPayload) => void;
  hideError: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: AddMemberAlmostDoneScreenNavigationProp;
}

export default Props;
