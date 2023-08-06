import { ReduxStore } from "../store";

export const forgotPassNumberSelector = (state: ReduxStore) =>
  state.forgotPassword.phoneNumber;
export const forgotPassCodeSelector = (state: ReduxStore) =>
  state.forgotPassword.code;
