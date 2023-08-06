import { RequestErrorView, RequestStatus } from "../types";

export interface ResetPasswordPayload {
  newPasswrod: string;
  newPasswordConfirmation: string;
}

export interface ForgotPasswordState {
  phoneNumber: string | null;
  code: string | null;
  newPassword: string | null;
  newPasswordConfirmation: string | null;
  requestSmsCodeForResetPassError: RequestErrorView | null;
  requestSmsCodeForResetPassStatus: RequestStatus;
  requestValidateSmsCodeError: RequestErrorView | null;
  requestValidateSmsCodeStatus: RequestStatus;
  requestResetPassError: RequestErrorView | null;
  requestResetPassStatus: RequestStatus;
}
