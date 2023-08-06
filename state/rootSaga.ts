import { takeLatest, throttle } from "redux-saga/effects";

import {
  logOutAsyncAction,
  logOutSaga,
  signInAsyncAction,
  signInSaga,
  requestSmsCodeAsyncAction,
  requestSmsCodeSaga,
  validateSmsCodeAsyncAction,
  validateSmsCodeSaga,
  isRegisteredUserAsyncAction,
  isRegisteredUserSaga,
  signUpAsyncAction,
  signUpSaga,
  changePhoneRequestAsyncAction,
  changePhoneRequestSaga,
  changePhoneNumberAsyncAction,
  changePhoneNumberSaga,
  validatePasswordAsyncAction,
  validatePasswordSaga,
  changePasswordAsyncAction,
  changePasswordSaga,
  addMemberAsyncAction,
  addMemberSaga
} from "./auth/Sagas";
import {
  doSearchAction,
  getBrandsAsyncAction,
  getBrandsSaga,
  doSearchSaga,
  getBrandSettingsAsyncAction,
  getBrandSettingsSaga
} from "./brands/Sagas";
import {
  requestSmsCodeForResetPassAsyncAction,
  requestSmsCodeForResetPassSaga,
  resetPasswordAsyncAction,
  resetPasswrodSaga,
  validateSmsCodeForResetPassAsyncAction,
  validateSmsCodeForResetPassSaga
} from "./forgotPassword/Sagas";
import { getProvincesSaga, getProvincesAsyncAction } from "./province/Sagas";
import {
  sendPatientFilesAsyncAction,
  sendPatientFilesSaga,
  scheduleCallAsyncAction,
  scheduleCallSaga,
  getPatientFilesAsyncAction,
  getPatientFilesSaga,
  updatePatientFilesAsyncAction,
  updatePatientFilesSaga
} from "./patientFiles/Sagas";
import { skipScreenAsyncAction, skipScreenSaga } from "./navigation/Sagas";
import {
  getHomeAsyncAction,
  getHomeSaga,
  getRegistrationInfoAsyncAction,
  getRegistrationInfoSaga,
  getSettingsInfoAsyncAction,
  getSettingsInfoSaga,
  getPatientInfoAsyncAction,
  getPatientInfoSaga,
  updatePatientInfoAsyncAction,
  updatePatientInfoSaga
} from "./account/Saga";
import {
  getPatientAddressesAsyncAction,
  getPatientAddressesSaga,
  editPatientAddressAsyncAction,
  editPatientAddressSaga,
  addPatientAddressAsyncAction,
  addPatientAddressSaga,
  deletePatientAddressAsyncAction,
  deletePatientAddressSaga
} from "./patientAddress/Sagas";

function* rootSaga() {
  yield takeLatest(signInAsyncAction, signInSaga);
  yield takeLatest(logOutAsyncAction, logOutSaga);
  yield takeLatest(getBrandsAsyncAction, getBrandsSaga);
  yield throttle(1000, doSearchAction, doSearchSaga);
  yield takeLatest(getProvincesAsyncAction, getProvincesSaga);
  yield takeLatest(isRegisteredUserAsyncAction, isRegisteredUserSaga);
  yield takeLatest(signUpAsyncAction, signUpSaga);
  yield takeLatest(getBrandSettingsAsyncAction, getBrandSettingsSaga);
  yield takeLatest(sendPatientFilesAsyncAction, sendPatientFilesSaga);
  yield takeLatest(requestSmsCodeAsyncAction, requestSmsCodeSaga);
  yield takeLatest(validateSmsCodeAsyncAction, validateSmsCodeSaga);

  yield takeLatest(
    requestSmsCodeForResetPassAsyncAction,
    requestSmsCodeForResetPassSaga
  );
  yield takeLatest(
    validateSmsCodeForResetPassAsyncAction,
    validateSmsCodeForResetPassSaga
  );
  yield takeLatest(resetPasswordAsyncAction, resetPasswrodSaga);
  yield takeLatest(getRegistrationInfoAsyncAction, getRegistrationInfoSaga);
  yield takeLatest(skipScreenAsyncAction, skipScreenSaga);
  yield takeLatest(scheduleCallAsyncAction, scheduleCallSaga);
  yield takeLatest(getHomeAsyncAction, getHomeSaga);
  yield takeLatest(changePhoneRequestAsyncAction, changePhoneRequestSaga);
  yield takeLatest(changePhoneNumberAsyncAction, changePhoneNumberSaga);
  yield takeLatest(validatePasswordAsyncAction, validatePasswordSaga);
  yield takeLatest(changePasswordAsyncAction, changePasswordSaga);
  yield takeLatest(getSettingsInfoAsyncAction, getSettingsInfoSaga);
  yield takeLatest(getPatientInfoAsyncAction, getPatientInfoSaga);
  yield takeLatest(updatePatientInfoAsyncAction, updatePatientInfoSaga);
  yield takeLatest(getPatientFilesAsyncAction, getPatientFilesSaga);
  yield takeLatest(updatePatientFilesAsyncAction, updatePatientFilesSaga);
  // Patient address
  yield takeLatest(getPatientAddressesAsyncAction, getPatientAddressesSaga);
  yield takeLatest(deletePatientAddressAsyncAction, deletePatientAddressSaga);
  yield takeLatest(editPatientAddressAsyncAction, editPatientAddressSaga);
  yield takeLatest(addPatientAddressAsyncAction, addPatientAddressSaga);

  yield takeLatest(addMemberAsyncAction, addMemberSaga);
}

export default rootSaga;
