import _ from "lodash";

import { AddressType, PatientAddressView } from "./types";

export const mapAddresses = (data: any[]): PatientAddressView[] => {
  return data.map((item) => {
    return {
      id: item.id,
      street: _.isNil(item.street) ? "" : item.street,
      city: _.isNil(item.city) ? "" : item.city,
      provinceKey: item.province.key,
      postalCode: _.isNil(item.zipCode) ? "" : item.zipCode,
      isPrimary: item.isDefault,
      type: mapAddressType(item.type)
    };
  });
};

const mapAddressType = (rawType: any): AddressType => {
  if (rawType === "Home") {
    return "home";
  } else if (rawType === "Work") {
    return "work";
  }
  return "other";
};

export const mapAddressTypeToParamAddressType = (type: AddressType): string => {
  if (type === "home") {
    return "Home";
  } else if (type === "work") {
    return "Work";
  }
  return "Other";
};
