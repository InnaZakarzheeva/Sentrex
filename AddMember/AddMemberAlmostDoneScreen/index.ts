import { connect } from "react-redux";

import {
  ReduxStore,
  authBrandByIdSelector,
  provinceByIdSelector,
  setAddionInfoAction,
  setProvinceAction,
  AdditionalInfoView,
  AdditionalInfoPayload,
  addMemberAsyncAction,
  resetRequestAddMemberAction
} from "../../../../state";
import AddMemberAlmostDoneScreen from "./AddMemberAlmostDoneScreen";
import { DispatchProps, StateProps } from "./types";

const mapState = (state: ReduxStore): StateProps => ({
  brand: authBrandByIdSelector(state),
  province: provinceByIdSelector(state),
  gender: state.auth.additionalInfo.gender,
  doctorsName: state.auth.additionalInfo.doctorsName,
  requestStatus: state.auth.requestAddMemberStatus,
  error: state.auth.requestAddMemberError
});

const mapDispatch: DispatchProps = {
  setAdditionalInfo: (info: AdditionalInfoView) => setAddionInfoAction(info),
  setProvince: (key: string) => setProvinceAction(key),
  addMember: (payload: AdditionalInfoPayload) => addMemberAsyncAction(payload),
  hideError: () => resetRequestAddMemberAction()
};

export const connector = connect(mapState, mapDispatch);
export default connector(AddMemberAlmostDoneScreen);
