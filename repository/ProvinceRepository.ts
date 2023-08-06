import ApiManager from "./api/ApiManager";

const PROVINCES = "/v1/AvailableValues/provinces";

class ProvinceRepository {
  private static instance: ProvinceRepository;

  private constructor() {}

  public static getInstance(): ProvinceRepository {
    if (!this.instance) {
      this.instance = new ProvinceRepository();
    }

    return this.instance;
  }

  public static getProvinces = () => {
    return ApiManager.getInstance().getAdditional(PROVINCES);
  };
}

export default ProvinceRepository;
