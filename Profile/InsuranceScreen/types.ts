import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";
import { RootStackParamList } from "../../../../navigation";
import {
  PatientPayload,
  PatientFilesPayload,
  RequestStatus,
  RequestErrorView,
  FilesType,
  FilesPayload,
  UpdateFilesPayload
} from "../../../../state";

import { connector } from "./index";

type InsuranceScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InsuranceScreen"
>;

export interface StateProps {
  user: PatientPayload | undefined;
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
  requestGetFilesStatus: RequestStatus;
  getFilesError: RequestErrorView | null;
  primaryInsurance: Array<FilesPayload>;
  secondaryInsurance: Array<FilesPayload>;
}

export interface DispatchProps {
  sendInsurance: (payload: PatientFilesPayload) => void;
  hideError: () => void;
  getFiles: (photoType: FilesType) => void;
  updateFiles: (payload: UpdateFilesPayload) => void;
  hideGetFilesError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: InsuranceScreenNavigationProp;
}

export default Props;
