import { ReduxStore } from "../store";
import { StepsPayload } from "./types";

export const getFirstScreenSelector = (store: ReduxStore): StepsPayload =>
  store.navigation.steps[0]?.step;

export const getCurrentScreenSelector = (store: ReduxStore): StepsPayload | undefined =>
  store.navigation.currentAdditionalScreen;
  
export const getSkippedScreensSelector = (store: ReduxStore): Array<StepsPayload> =>
  store.navigation.skippedSteps;

export const getMandatoryScreenSelector = (store: ReduxStore): boolean | undefined =>
  store.navigation.steps.find(item => item.step === store.navigation.currentAdditionalScreen)?.mandatory