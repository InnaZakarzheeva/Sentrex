import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { RootStackParamList } from "../../../../navigation";
import {
  PatientPersonalInfoPayload,
  RequestErrorView,
  RequestStatus
} from "../../../../state";

import { connector } from "./index";

type AboutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AboutScreen"
>;

export interface StateProps {
  patient: PatientPersonalInfoPayload;
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
  requestUpdateInfoStatus: RequestStatus;
  errorUpdateInfo: RequestErrorView | null;
}

export interface DispatchProps {
  getPatientInfo: () => void;
  hideError: () => void;
  updatePatientInfo: (patient: PatientPersonalInfoPayload) => void;
  hideUpdateError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: AboutScreenNavigationProp;
}

export default Props;
