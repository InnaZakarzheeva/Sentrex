import { GetFilesPayload } from "./types";

export const mapFilesPayload = (response: any): GetFilesPayload =>
  response.value as GetFilesPayload;
