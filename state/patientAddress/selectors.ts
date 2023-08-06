import { ReduxStore } from "../store";
import { addressSelectors } from "./Slice";

export const allPatientAddressesSelector = (state: ReduxStore) =>
  addressSelectors.selectAll(state.patientAddress);

export const patientAddressById = (state: ReduxStore, id?: string) => {
  if (!id) {
    return undefined;
  }
  return addressSelectors.selectById(state.patientAddress, id);
};
