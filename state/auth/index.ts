import {
  signInAsyncAction,
  signUpAsyncAction,
  requestSmsCodeAsyncAction,
  validateSmsCodeAsyncAction,
  isRegisteredUserAsyncAction,
  logOutAsyncAction,
  changePhoneRequestAsyncAction,
  changePhoneNumberAsyncAction,
  validatePasswordAsyncAction,
  changePasswordAsyncAction,
  addMemberAsyncAction
} from "./Sagas";
import Slice from "./Slice";

export * from "./types";
export const {
  hideSignInErrorAction,
  resetRequestIsRegisteredStatusAction,
  resetRequestSignUpStatusAction,
  resetRequestSmsCodeStatusAction,
  resetRequestValidateCodeStatusAction,
  setAccountTypeAction,
  setAddionInfoAction,
  setBrandAction,
  setPasswordAction,
  setPatientInfoAction,
  setPhoneNumberAction,
  setProvinceAction,
  setUserInfoAction,
  resetRequestSignInAction,
  resetRequestLogOutAction,
  resetRequestChangePhoneCheckAction,
  resetRequestChangePhoneAction,
  resetRequestValidatePasswordAction,
  resetRequestChangePasswordAction,
  resetRequestAddMemberAction
} = Slice.actions;
export {
  signInAsyncAction,
  signUpAsyncAction,
  requestSmsCodeAsyncAction,
  validateSmsCodeAsyncAction,
  isRegisteredUserAsyncAction,
  logOutAsyncAction,
  changePhoneRequestAsyncAction,
  changePhoneNumberAsyncAction,
  validatePasswordAsyncAction,
  changePasswordAsyncAction,
  addMemberAsyncAction
};
