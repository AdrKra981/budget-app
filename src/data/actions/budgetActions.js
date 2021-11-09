import { addTransaction, getBudget, getBudgetCategories } from "data/fetch/budgetFetch";
const {
    BUDGET_GET,
    BUDGET_CATEGORIES_GET,
    SET_SELECTED_PARENT_CATEGORY_ID,
    BUDGET_TRANSACTION_ADD,
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

export const AddTransaction = ({budgetId, data}) => {
  const promise = addTransaction({
    budgetId,
    data
  });

  return{
    type: BUDGET_TRANSACTION_ADD,
    promise,
    successMessage: 'Pomyślnie dodano transakcję!',
  }
}

export const selectParentCategory = (id) => {
  return {
    type: SET_SELECTED_PARENT_CATEGORY_ID,
    payload: id,
  }
}
