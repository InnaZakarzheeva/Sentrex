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
  BrandView,
  UpdateFilesPayload
} from "../../../../state";

import { connector } from "./index";

type PrescriptionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PrescriptionsScreen"
>;

export interface StateProps {
  user: PatientPayload | undefined;
  brand: BrandView | undefined;
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
  requestGetFilesStatus: RequestStatus;
  getFilesError: RequestErrorView | null;
  prescriptions: Array<FilesPayload>;
}

export interface DispatchProps {
  sendPrescriptions: (payload: PatientFilesPayload) => void;
  hideError: () => void;
  getFiles: (photoType: FilesType) => void;
  updateFiles: (payload: UpdateFilesPayload) => void;
  hideGetFilesError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: PrescriptionsScreenNavigationProp;
}

export default Props;
