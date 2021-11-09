import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";

import {
  fetchBudget,
  fetchBudgetCategories,
  AddTransaction,
} from "data/actions/budgetActions";
import { fetchAllCategories } from "data/actions/commonActions";
import { Grid } from "./BudgetStyles";
import { Button, LoadingIndicator } from "components";
import BudgetCategoryList from "./components/BudgetCategoryList";
import BudgetTransactionList from "./components/BudgetTransactionList";
import Modal from "components/Modal";
import AddTransactionForm from "./components/AddTransactionForm";
import budget from "data/reducers/budgetReducer";

const Budget = ({
  commonState,
  budgetState,
  budget,
  fetchBudget,
  fetchBudgetCategories,
  fetchAllCategories,
  allCategories,
  AddTransaction,
}) => {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetCategories, fetchAllCategories]);

  const history = useHistory();

  const isLoaded = useMemo(() => {
    if (!!commonState && !!budgetState) {
      return (
        Object.keys(commonState).length === 0 &&
        Object.keys(budgetState).length === 0
      );
    } else {
      return false;
    }
  }, [commonState, budgetState]);

  const handleSubmitAddTransaction = (value) => {
    AddTransaction({
      budgetId: budget.id,
      data: value,
    }).then(() => {
      history.goBack();
    });
  };

  return (
    <>
      <Grid>
        <section>
          {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
        </section>
        <section>
          {isLoaded ? (
            <>
              <Button to="/budget/transactions/new">Add new transaction</Button>
              <BudgetTransactionList />
            </>
          ) : (
            <LoadingIndicator />
          )}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm
              categories={allCategories}
              groupCategoriesBy="parentCategory.name"
              onSubmit={handleSubmitAddTransaction}
            />
          </Modal>
        </Route>
      </Switch>
    </>
  );
};

const ConnectedBudget = connect(
  (state) => {
    return {
      budget: state.budget.budget,
      budgetCategories: state.budget.budgetCategories,
      allCategories: state.common.allCategories,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
    };
  },
  {
    fetchBudget,
    fetchBudgetCategories,
    fetchAllCategories,
    AddTransaction,
  }
)(Budget);

export default ConnectedBudget;
