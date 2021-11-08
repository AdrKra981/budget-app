import { ALL_CATEGORIES_GET } from "data/constans";
import { getAllCategories } from "data/fetch/commonFetch";

export const fetchAllCategories = () => async (dispatch) => {
  const promise = getAllCategories();

  dispatch({
    type: ALL_CATEGORIES_GET,
    promise
  })
};
  