import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { AddMemberParamList, TabsParamList } from "../../../../navigation";
import { BrandView, RequestErrorView, RequestStatus } from "../../../../state";

import { connector } from "./index";

type AddMemberBrandScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList>,
  StackNavigationProp<AddMemberParamList, "AddMemberBrandScreen">
>;

export interface StateProps {
  brands: Array<BrandView>;
  requestStatus: RequestStatus;
  brandId: string;
  error: RequestErrorView | null;
}

export interface DispatchProps {
  getBrands: () => void;
  addBrand: (brandId: string) => void;
  searchBrand: (value: string) => void;
  getBrandSettings: (brandId: string) => void;
  hideError: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: AddMemberBrandScreenNavigationProp;
}

export default Props;
