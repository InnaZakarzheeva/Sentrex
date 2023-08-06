import ApiManager from "./api/ApiManager";

const BRAND = "/v1/Brands";
const BRAND_SETTINGS = "/api/brand-setting";

class BrandsRepository {
  private static instance: BrandsRepository;

  private constructor() {}

  public static getInstance(): BrandsRepository {
    if (!this.instance) {
      this.instance = new BrandsRepository();
    }

    return this.instance;
  }

  public static getBrands = () => {
    return ApiManager.getInstance().getAdditional(BRAND);
  };

  public static getBrandSettings = (drugBrandCode: string) => {
    return ApiManager.getInstance().get(
      `${BRAND_SETTINGS}?drugBrandCode=${drugBrandCode}`
    );
  };
}

export default BrandsRepository;
