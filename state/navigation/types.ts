export interface NavigationState {
  splashShown: boolean;
  userRegistered: boolean;
  userLoggedIn: boolean;
  additionalStepsPassed: boolean;
  currentAdditionalScreen: StepsPayload | undefined;
  steps: Array<AdditionalStepsPayload>;
  userForgotPassword: boolean;
  skippedSteps: Array<StepsPayload>;
}

export interface AdditionalStepsPayload {
  step: StepsPayload;
  mandatory: boolean;
}

export type StepsPayload =
  | "AddPrescription"
  | "AddDispence"
  | "AddHealthCard"
  | "AddInsurer"
  | "ScheduleCall";

export interface SetScreenPayload {
  screen: StepsPayload;
  fromSteps: boolean;
}
