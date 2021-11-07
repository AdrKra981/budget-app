import { getBudget } from "data/fetch/budgetFetch";
const {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
  } = require("data/constans");

export const fetchBudget = (id) => async (dispatch) => {
  dispatch({
    type: BUDGET_GET_REQUEST,
  });

  try {
    const response = await getBudget(id);
    const data = response.json();
    dispatch({
      type: BUDGET_GET_SUCCESS,
      payload: {
        budget: data,
      },
    });
  } catch (err) {
    dispatch({
      type: BUDGET_GET_FAILURE,
    });
  }
};

const fetchBudgetCategories = () => {};
