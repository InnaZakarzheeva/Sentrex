import { connect } from "react-redux";

import {
  logOutAsyncAction,
  ReduxStore,
  resetRequestLogOutAction,
  getBrandByIdSelector,
  getCurrentUserSelector,
  UserInfoPayload,
  getRegistrationInfoAsyncAction,
  getUsersDataSelector,
  getBrandsDataSelector
} from "../../../../state";
import ProfileScreen from "./ProfileScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  error: state.auth.requestLogOutError,
  requestStatus: state.auth.requestLogOutStatus,
  brand: getBrandByIdSelector(state),
  user: getCurrentUserSelector(state),
  patients: getUsersDataSelector(state),
  drugBrandsCodes: getBrandsDataSelector(state)
});

const mapDispatch: DispatchProps = {
  logOut: () => logOutAsyncAction(),
  resetRequestStatus: () => resetRequestLogOutAction(),
  getRegistrationInfo: (payload?: UserInfoPayload) =>
    getRegistrationInfoAsyncAction(payload)
};

export const connector = connect(mapState, mapDispatch);
export default connector(ProfileScreen);
