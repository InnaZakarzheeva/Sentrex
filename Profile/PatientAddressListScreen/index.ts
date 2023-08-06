import { connect } from "react-redux";

import {
  allPatientAddressesSelector,
  ReduxStore,
  getPatientAddressesAsyncAction,
  deletePatientAddressAsyncAction,
  resetRequestGetAddressesStatusAction,
  resetRequestDeleteAddressStatusAction,
  userNameSelector
} from "../../../../state";

import PatientAddressListScreen from "./PatientAddressListScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  userName: userNameSelector(state),
  allAddresses: allPatientAddressesSelector(state),
  requestStatusGetAddresses: state.patientAddress.requestGetAddressesStatus,
  requestErrorGetAddresses: state.patientAddress.requestGetAddressesError,
  requestStatusDeleteAddress: state.patientAddress.requestDeleteAddressStatus,
  requestErrorDeleteAddress: state.patientAddress.requestDeleteAddressError
});

const mapDispatch: DispatchProps = {
  getAllAddresses: () => getPatientAddressesAsyncAction(),
  deleteAddress: (addressId: string) =>
    deletePatientAddressAsyncAction({ addressId, fromDetails: false }),
  hideGetAddressesError: () => resetRequestGetAddressesStatusAction(),
  hideDeleteAddressError: () => resetRequestDeleteAddressStatusAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(PatientAddressListScreen);
