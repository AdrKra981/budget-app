import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";

import { fetchBudget, fetchBudgetCategories } from "data/actions/budgetActions";
import { fetchAllCategories } from "data/actions/commonActions";
import { Grid } from "./BudgetStyles";
import { LoadingIndicator } from "components";
import BudgetCategoryList from "./components/BudgetCategoryList";

const Budget = ({
  commonState,
  budgetState,
  fetchBudget,
  fetchBudgetCategories,
  fetchAllCategories,
}) => {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories]);

  const isLoaded = useMemo(() => {
    if (!!commonState && !!budgetState) {
      return (
        Object.keys(commonState).length === 0 &&
        Object.keys(budgetState).length === 0
      );
    }else{
        return false;
    }
  }, [commonState, budgetState]);

  return (
    <Grid>
      <section>{isLoaded ? (
        <BudgetCategoryList />
      ) : (
          <LoadingIndicator />
      )}</section>
      <section>{isLoaded ? 'TRANSACTIONS' : (
          <LoadingIndicator />
      )}</section>
    </Grid>
  );
};

const ConnectedBudget = connect(
  (state) => {
    return {
      budget: state.budget.budget,
      budgetCategories: state.budget.budgetCategories,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
    };
  },
  {
    fetchBudget,
    fetchBudgetCategories,
    fetchAllCategories,
  }
)(Budget);

export default ConnectedBudget;
