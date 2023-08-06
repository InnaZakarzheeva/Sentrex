import { connect } from "react-redux";

import {
  brandsBySearchKeySelector,
  ReduxStore,
  getBrandsAsyncAction,
  setMemberDrugBrandCodeAction,
  doSearchAction,
  getBrandSettingsAsyncAction,
  hideGetBrandSettingsErrorAction
} from "../../../../state";
import AddMemberBrandScreen from "./AddMemberBrandScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  brands: brandsBySearchKeySelector(state),
  requestStatus: state.brands.requestStatus,
  brandId: state.auth.brandId,
  error: state.brands.requestError
});

const mapDispatch: DispatchProps = {
  getBrands: () => getBrandsAsyncAction(),
  addBrand: (brandId: string) => setMemberDrugBrandCodeAction(brandId),
  searchBrand: (value: string) => doSearchAction(value),
  getBrandSettings: (brandId: string) => getBrandSettingsAsyncAction(brandId),
  hideError: () => hideGetBrandSettingsErrorAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(AddMemberBrandScreen);
