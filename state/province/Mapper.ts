import { ProvinceView } from "./types";

export const mapProvinces = (response: any): Array<ProvinceView> => {
  return response.value as Array<ProvinceView>;
};
