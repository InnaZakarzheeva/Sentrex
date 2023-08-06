import { AdditionalStepsPayload } from "./types";

export const mapSteps = (response: any): Array<AdditionalStepsPayload> => {
  return response.value.stepsToComplete as Array<AdditionalStepsPayload>;
};
