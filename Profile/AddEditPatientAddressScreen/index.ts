import { connect } from "react-redux";

import {
  ReduxStore,
  addPatientAddressAsyncAction,
  PatientAddressPayload,
  editPatientAddressAsyncAction,
  resetRequestAddAddressStatusAction,
  resetRequestEditAddressStatusAction,
  patientAddressById,
  userNameSelector,
  deletePatientAddressAsyncAction,
  resetRequestDeleteAddressStatusAction
} from "../../../../state";

import AddEditPatientAddressScreen from "./AddEditPatientAddressScreen";
import { DispatchProps, StateProps, OwnProps } from "./types";

const mapState = (state: ReduxStore, ownProps: OwnProps): StateProps => ({
  userName: userNameSelector(state),
  address: patientAddressById(state, ownProps.route.params?.addressId),
  requestStatusEditAddress: state.patientAddress.requestEditAddressStatus,
  requestErrorEditAddress: state.patientAddress.requestEditAddressError,
  requestStatusAddAddress: state.patientAddress.requestAddAddressStatus,
  requestErrorAddAddress: state.patientAddress.requestAddAddressError,
  requestStatusDeleteAddress: state.patientAddress.requestDeleteAddressStatus,
  requestErrorDeleteAddress: state.patientAddress.requestDeleteAddressError
});

const mapDispatch: DispatchProps = {
  addNewAddress: (address: PatientAddressPayload) =>
    addPatientAddressAsyncAction(address),
  editAddress: (address: PatientAddressPayload) =>
    editPatientAddressAsyncAction(address),
  deleteAddress: (addressId: string) =>
    deletePatientAddressAsyncAction({ addressId, fromDetails: true }),
  hideAddAddressError: () => resetRequestAddAddressStatusAction(),
  hideEditAddressError: () => resetRequestEditAddressStatusAction(),
  hideDeleteAddressError: () => resetRequestDeleteAddressStatusAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(AddEditPatientAddressScreen);
