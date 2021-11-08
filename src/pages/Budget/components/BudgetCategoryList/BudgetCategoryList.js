import { connect } from "react-redux";
import { groupBy } from "lodash";
import 'styled-components/macro';
import ToggleableList from "components/ToggleableList";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

const BudgetCategoryList = ({ budgetedCategories, allCategories, budget }) => {
  const budgetedCategoriesByParent = groupBy(
    budgetedCategories,
    (item) =>
      allCategories.find((category) => category.id === item.categoryId)
        .parentCategory.name
  );

  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          name={parentName}
          onClick={() => onClick(parentName)}
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
      <div css={`
        border-bottom: 5px solid ${({theme}) => theme.colors.gray.light};
      `}>
        <ParentCategory name={budget.name} amount={restToSpent} />
      </div>
      <ToggleableList items={listItems} />
      <div css={`
        border-top: 5px solid ${({theme}) => theme.colors.gray.light};
      `}>
      <ParentCategory
        name={"Other Categories"}
        amount={availableForRestCategories}
      />
      </div>
    </ul>
  );
};

export default connect((state) => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget,
}))(BudgetCategoryList);
