import { RequestErrorView, RequestStatus } from "../types";

export interface PatientAddressView {
  id: string;
  street: string;
  city: string;
  provinceKey: string;
  postalCode: string;
  isPrimary: boolean;
  type: AddressType;
}

export interface PatientAddressPayload {
  id?: string;
  street: string;
  city: string;
  provinceKey: string;
  postalCode: string;
  isPrimary: boolean;
  type: AddressType;
}

export type AddressType = "home" | "work" | "other";

export interface AddressState {
  requestGetAddressesError: RequestErrorView | null;
  requestGetAddressesStatus: RequestStatus;
  requestAddAddressError: RequestErrorView | null;
  requestAddAddressStatus: RequestStatus;
  requestEditAddressError: RequestErrorView | null;
  requestEditAddressStatus: RequestStatus;
  requestDeleteAddressError: RequestErrorView | null;
  requestDeleteAddressStatus: RequestStatus;
}
