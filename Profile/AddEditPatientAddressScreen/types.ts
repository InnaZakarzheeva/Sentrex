import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { RootStackParamList } from "../../../../navigation";
import {
  RequestErrorView,
  RequestStatus,
  PatientAddressView,
  PatientAddressPayload,
  AddressType,
  ProvinceView
} from "../../../../state";

import { connector } from "./index";

type AddEditPatientAddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddEditPatientAddressScreen"
>;

type AddEditPatientAddressScreenRouteProp = RouteProp<
  RootStackParamList,
  "AddEditPatientAddressScreen"
>;

export interface StateProps {
  userName: string;
  address?: PatientAddressView;
  requestStatusEditAddress: RequestStatus;
  requestErrorEditAddress: RequestErrorView | null;
  requestStatusAddAddress: RequestStatus;
  requestErrorAddAddress: RequestErrorView | null;
  requestStatusDeleteAddress: RequestStatus;
  requestErrorDeleteAddress: RequestErrorView | null;
}

export interface DispatchProps {
  addNewAddress: (address: PatientAddressPayload) => void;
  editAddress: (address: PatientAddressPayload) => void;
  deleteAddress: (addressId: string) => void;
  hideAddAddressError: () => void;
  hideEditAddressError: () => void;
  hideDeleteAddressError: () => void;
}

export interface OwnProps {
  navigation: AddEditPatientAddressScreenNavigationProp;
  route: AddEditPatientAddressScreenRouteProp;
}

type Props = ConnectedProps<typeof connector> & OwnProps;

export default Props;
