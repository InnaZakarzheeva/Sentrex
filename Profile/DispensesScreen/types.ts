import { StackNavigationProp } from "@react-navigation/stack";
import { ConnectedProps } from "react-redux";

import { AdditionalStepsParamList } from "../../../../navigation";
import {
  BrandView,
  FilesPayload,
  FilesType,
  RequestErrorView,
  RequestStatus,
  UpdateFilesPayload
} from "../../../../state";

import { connector } from "./index";

type AddDispenceNavigationProp = StackNavigationProp<
  AdditionalStepsParamList,
  "AddDispenceScreen"
>;

export interface StateProps {
  user: PatientPayload | undefined;
  brand: BrandView | undefined;
  requestStatus: RequestStatus;
  error: RequestErrorView | null;
  dispenses: Array<FilesPayload>;
  requestGetFilesStatus: RequestStatus;
  getFilesError: RequestErrorView | null;
}

export interface DispatchProps {
  hideError: () => void;
  updateFiles: (payload: UpdateFilesPayload) => void;
  getFiles: (photoType: FilesType) => void;
  hideGetFilesError: () => void;
}

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  navigation: AddDispenceNavigationProp;
}

export default Props;
