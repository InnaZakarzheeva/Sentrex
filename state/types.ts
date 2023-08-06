export type RequestStatus = "idle" | "pending" | "success" | "failure";

export interface RequestErrorView {
  code: number;
  message: string;
}

export interface DefaultSliceState {
  requestError: RequestErrorView | null;
  requestStatus: RequestStatus;
}
