import { connect } from "react-redux";

import {
  getBrandByIdSelector,
  getBrandsDataSelector,
  getCurrentUserSelector,
  getHomeAsyncAction,
  getProvincesAsyncAction,
  getRegistrationInfoAsyncAction,
  getUsersDataSelector,
  ReduxStore,
  resetRequestRegistrationInfoAction,
  UserInfoPayload
} from "../../../../state";
import HomeScreen from "./HomeScreen";
import { StateProps, DispatchProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  brand: getBrandByIdSelector(state),
  user: getCurrentUserSelector(state),
  patients: getUsersDataSelector(state),
  drugBrandsCodes: getBrandsDataSelector(state),
  requestStatus: state.account.requestRegistrationInfoStatus,
  error: state.account.requestRegistrationInfoError
});

const mapDispatch: DispatchProps = {
  getHome: () => getHomeAsyncAction(),
  getRegistrationInfo: (payload?: UserInfoPayload) =>
    getRegistrationInfoAsyncAction(payload),
  getProvinces: () => getProvincesAsyncAction(),
  hideError: () => resetRequestRegistrationInfoAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(HomeScreen);
