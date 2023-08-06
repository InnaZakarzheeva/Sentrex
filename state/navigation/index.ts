import Slice from "./Slice";

import { skipScreenAsyncAction } from "./Sagas";

export * from "./types";
export * from "./selectors";

export const {
  hideSplashAction,
  navigateToMainScreenAction,
  navigateToSignUpAction,
  navigateToSignInAction,
  navigateToResetPassword,
  skipScreenAction,
  setSkippedStepsAction
} = Slice.actions;

export { skipScreenAsyncAction };
