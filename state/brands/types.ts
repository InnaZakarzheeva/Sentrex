import { AdditionalStepsPayload } from "../navigation";
import { DefaultSliceState, RequestErrorView, RequestStatus } from "../types";

export interface BrandView {
  name: string;
  logoPath: string;
}

export interface BrandsState extends DefaultSliceState {
  searchValue: string;
  allowCaregiver: boolean;
  requestGetBrandsStatus: RequestStatus;
  requestGetBrandsError: RequestErrorView | null;
}

export interface BrandSettingsResponse {
  allowCaregiver: boolean;
  steps: Array<AdditionalStepsPayload>;
}
