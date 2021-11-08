import { getBudget, getBudgetCategories } from "data/fetch/budgetFetch";
const {
    BUDGET_GET,
    BUDGET_CATEGORIES_GET,
  } = require("data/constans");

export const fetchBudget = (id) => (dispatch) => {
  const promise = getBudget(id);

  dispatch({
    type: BUDGET_GET,
    promise
  });
};

export const fetchBudgetCategories = (id) => (dispatch) => {
  const promise = getBudgetCategories(id);
  
  dispatch({
    type: BUDGET_CATEGORIES_GET,
    promise
  });
};
