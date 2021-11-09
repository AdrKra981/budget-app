import { connect } from "react-redux";
import { groupBy } from "lodash";
import { useRef } from "react";
import "styled-components/macro";
import ToggleableList from "components/ToggleableList";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

import { selectParentCategory } from "data/actions/budgetActions";

const BudgetCategoryList = ({
  budgetedCategories,
  allCategories,
  budget,
  selectParentCategory,
}) => {
  const budgetedCategoriesByParent = groupBy(
    budgetedCategories,
    (item) =>
      allCategories.find((category) => category.id === item.categoryId)
        .parentCategory.name
  );

  const handleClickParentCategoryRef = useRef(null);

  const handleClearParentCategorySelect = () => {
    selectParentCategory();
    handleClickParentCategoryRef.current();
  };

  const handleSelectRestParentCategories = () => {
    selectParentCategory(null);
    handleClickParentCategoryRef.current();
  };

  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          name={parentName}
          onClick={() => {
            onClick(parentName);
            selectParentCategory(parentName);
          }}
          categories={categories}
          transactions={budget.transactions}
        />
      ),
      children: categories.map((category) => {
        const { name } = allCategories.find(
          (item) => item.id === category.categoryId
        );
        return (
          <CategoryItem
            key={category.id}
            name={name}
            transactions={budget.transactions}
            item={category}
          />
        );
      }),
    })
  );

  const totalSpent = budget.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const restToSpent = budget.totalAmount - totalSpent;
  const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTransactions = budget.transactions.filter(
      (transaction) => transaction.categoryId === budgetedCategory.id
    );
    const categoryExpenses = categoryTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0);

  const notBudgetedTransactions = budget.transactions.filter((transaction) => {
    return !budgetedCategories.find(
      (budgetedCategory) => budgetedCategory.id === transaction.categoryId
    );
  });

  const notBudgetedExpenses = notBudgetedTransactions.reduce(
    (acc, notBudgetedTransaction) => acc + notBudgetedTransaction.amount,
    0
  );

  const availableForRestCategories =
    budget.totalAmount - amountTaken - notBudgetedExpenses;

  return (
    <ul>
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleClearParentCategorySelect}
        />
      </div>
      <ToggleableList
        items={listItems}
        clickRef={handleClickParentCategoryRef}
      />
      <div
        css={`
          border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory
          name={"Other Categories"}
          amount={availableForRestCategories}
          onClick={handleSelectRestParentCategories}
        />
      </div>
    </ul>
  );
};

export default connect(
  (state) => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget,
  }),
  {
    selectParentCategory,
  }
)(BudgetCategoryList);
