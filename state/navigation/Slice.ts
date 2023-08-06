import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NavigationState, AdditionalStepsPayload, StepsPayload } from "./types";

export const SLICE_NAME = "NAVIGATION";

const initialState: NavigationState = {
  splashShown: false,
  userLoggedIn: false,
  userRegistered: true,
  additionalStepsPassed: false,
  currentAdditionalScreen: undefined,
  steps: [],
  userForgotPassword: false,
  skippedSteps: []
};

const navigationSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    showSplashAction: (state) => {
      state.splashShown = true;
    },
    hideSplashAction: (state) => {
      state.splashShown = false;
    },
    navigateToSignInAction: (state) => {
      state.userRegistered = true;
      state.userLoggedIn = false;
      state.userForgotPassword = false;
    },
    navigateToResetPassword: (state) => {
      state.userRegistered = true;
      state.userLoggedIn = false;
      state.userForgotPassword = true;
    },
    navigateToSignUpAction: (state) => {
      state.userRegistered = false;
      state.userLoggedIn = false;
      state.userForgotPassword = false;
    },
    navigateToMainScreenAction: (state) => {
      state.userLoggedIn = true;
      state.userRegistered = true;
    },
    setStepsAction: (
      state,
      action: PayloadAction<Array<AdditionalStepsPayload>>
    ) => {
      const filteredSteps = action.payload.filter(
        (item) => !state.skippedSteps.includes(item.step)
      );
      state.steps = filteredSteps;
      if (filteredSteps[0]) {
        state.currentAdditionalScreen = filteredSteps[0].step;
      } else {
        state.additionalStepsPassed = true;
      }
    },
    skipScreenAction: (state, action: PayloadAction<Array<StepsPayload>>) => {
      if (state.currentAdditionalScreen) {
        state.skippedSteps = action.payload;
        const index = state.steps.findIndex(
          (item) => item.step === state.currentAdditionalScreen
        );
        const nextScreen = state.steps[index + 1];
        if (nextScreen) {
          state.currentAdditionalScreen = nextScreen.step;
        } else {
          state.additionalStepsPassed = true;
        }
      }
    },
    setSkippedStepsAction: (
      state,
      action: PayloadAction<Array<StepsPayload>>
    ) => {
      state.skippedSteps = action.payload;
    }
  }
});

export default navigationSlice;
