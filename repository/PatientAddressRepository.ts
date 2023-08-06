import ApiManager from "./api/ApiManager";

const ADDRESS = "api/address";

class PatientAddressRepository {
  private static instance: PatientAddressRepository;

  private constructor() {}

  public static getInstance(): PatientAddressRepository {
    if (!this.instance) {
      this.instance = new PatientAddressRepository();
    }

    return this.instance;
  }

  public static getAddresses = (patientId: string) => {
    return ApiManager.getInstance().get(ADDRESS, { patientId });
  };

  public static addAddress = (data: any) => {
    return ApiManager.getInstance().post(ADDRESS, data);
  };

  public static editAddress = (data: any) => {
    return ApiManager.getInstance().put(ADDRESS, data);
  };

  public static deleteAddress = (addressId: string) => {
    return ApiManager.getInstance().delete(ADDRESS, { addressId });
  };
}

export default PatientAddressRepository;
