import { getProvincesAsyncAction } from "./Sagas";
import Slice from "./Slice";

export * from "./selectors";
export * from "./types";
export const {
  showErrorAction,
  startRequestAction
} = Slice.actions;
export { getProvincesAsyncAction };
