import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { RootStackParamList } from "../../../../navigation";
import {
  RequestErrorView,
  RequestStatus,
  PatientAddressView
} from "../../../../state";

import { connector } from "./index";

type PatientAddressListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PatientAddressListScreen"
>;

export interface StateProps {
  userName: string;
  allAddresses: PatientAddressView[];
  requestStatusGetAddresses: RequestStatus;
  requestErrorGetAddresses: RequestErrorView | null;
  requestStatusDeleteAddress: RequestStatus;
  requestErrorDeleteAddress: RequestErrorView | null;
}

export interface DispatchProps {
  getAllAddresses: () => void;
  deleteAddress: (addressId: string) => void;
  hideGetAddressesError: () => void;
  hideDeleteAddressError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: PatientAddressListScreenNavigationProp;
}

export default Props;
