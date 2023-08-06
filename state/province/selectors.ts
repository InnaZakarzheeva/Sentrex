import { ReduxStore } from "../store";
import { provincesSelectors } from "./Slice";

export const allProvincesSelector = (state: ReduxStore) =>
  provincesSelectors.selectAll(state.provinces);

export const provinceByIdSelector = (state: ReduxStore) =>
  provincesSelectors.selectById(state.provinces, state.auth.provinceId);

export const provinceByIdSelector1 = (state: ReduxStore, id: string) =>
  provincesSelectors.selectById(state.provinces, id);
