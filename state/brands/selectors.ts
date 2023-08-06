import { createSelector } from "reselect";

import { ReduxStore } from "../store";
import { brandsAdapter, brandsSelectors } from "./Slice";

const getSearchValue = (state: ReduxStore) => state.brands.searchValue;
const brandsSlice = (state: ReduxStore) => state.brands;

// TODO : this selectro works incorrectly as it creates new selectAll on every state change.
export const brandsBySearchKeySelector = createSelector(
  getSearchValue,
  brandsAdapter.getSelectors(brandsSlice).selectAll,
  (searchValue, entities) => {
    return entities.filter((e) =>
      e.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
);

export const authBrandByIdSelector = (state: ReduxStore) =>
  brandsSelectors.selectById(state.brands, state.auth.brandId);

export const userBrandByIdSelector = (state: ReduxStore) =>
  brandsSelectors.selectById(state.brands, state.account.user.drugBrandCode);
