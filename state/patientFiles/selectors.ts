import { createSelector } from "reselect";
import { ReduxStore } from "../store";
import { filesAdapter } from "./Slice";
import { FilesType } from "./types";

const filesSlice = (state: ReduxStore) => state.patientFiles;

export const filesByTypeSelector = (state: ReduxStore, photoType: FilesType) =>
  createSelector(filesAdapter.getSelectors(filesSlice).selectAll, (files) =>
    files.filter((file) => file.filesType === photoType)
  )(state);
