import Slice from "./Slice";
import {
  requestSmsCodeForResetPassAsyncAction,
  validateSmsCodeForResetPassAsyncAction,
  resetPasswordAsyncAction
} from "./Sagas";

export * from "./types";
export const {
  resetRequestSmsCodeForResetPassStatusAction,
  resetRequestValidateCodeForResetPassStatusAction,
  resetRequestResetPassStatusAction
} = Slice.actions;
export {
  requestSmsCodeForResetPassAsyncAction,
  validateSmsCodeForResetPassAsyncAction,
  resetPasswordAsyncAction
};
