import { getBudget, getBudgetCategories } from "data/fetch/budgetFetch";
const {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    BUDGET_CATEGORIES_GET_REQUEST,
    BUDGET_CATEGORIES_GET_SUCCESS,
    BUDGET_CATEGORIES_GET_FAILURE,
  } = require("data/constans");

export const fetchBudget = (id) => async (dispatch) => {
  dispatch({
    type: BUDGET_GET_REQUEST,
  });

  try {
    const response = await getBudget(id);
    const data = await response.json();
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

export const fetchBudgetCategories = (id) => async (dispatch) => {
  dispatch({
    type: BUDGET_CATEGORIES_GET_REQUEST,
  });
  try {
    const response = await getBudgetCategories(id);
    const data = await response.json();
    dispatch({
      type: BUDGET_CATEGORIES_GET_SUCCESS,
      payload: {
        budget: data,
      },
    });
  } catch (err) {
    dispatch({
      type: BUDGET_CATEGORIES_GET_FAILURE,
    });
  }
};
