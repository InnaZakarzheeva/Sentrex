import { BrandSettingsResponse, BrandView } from "./types";

export const mapBrandSettingsResponse = (
  response: any
): BrandSettingsResponse => {
  return response.data.value as BrandSettingsResponse;
};

export const mapBrands = (response: any): Array<BrandView> => {
  return response.value as Array<BrandView>;
};
