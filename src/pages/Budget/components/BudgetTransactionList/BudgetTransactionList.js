import { connect } from "react-redux";
import { groupBy } from "lodash";
import { ListItem, List } from "./BudgetTransactionListStyles";
import { formatCurrency, formatDate } from "utils";
import { useMemo } from "react";

const BudgetTransactionList = ({
  transactions,
  categories,
  selectedParentCategoryId,
  budgetedCategories,
}) => {
  const filteredTransactionsBySelectedParentCategory = useMemo(() => {
    if (typeof selectedParentCategoryId === "undefined") {
      return transactions;
    }

    if (selectedParentCategoryId === null) {
      return transactions.filter((transaction) => {
        const hasBudgetCategory = budgetedCategories.some(
          (budgetedCategory) =>
            budgetedCategory.categoryId === transaction.categoryId
        );

        return !hasBudgetCategory;
      });
    }

    return transactions.filter((transaction) => {
      try {
        const category = categories.find(
          (category) => category.id === transaction.categoryId
        );

        const parentCategoryName = category.parentCategory.name;

        return parentCategoryName === selectedParentCategoryId;
      } catch (err) {
        return false;
      }
    });
  }, [transactions, categories, selectedParentCategoryId, budgetedCategories]);

  const groupedTransactions = groupBy(
    filteredTransactionsBySelectedParentCategory,
    (transaction) => new Date(transaction.date).getUTCDate()
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li>
          <ul key={key}>
            {transactions.map((transaction) => (
              <ListItem key={transaction.id}>
                <div>{transaction.description}</div>
                <div>{formatCurrency(transaction.amount)}</div>
                <div>{formatDate(transaction.date)}</div>
                <div>
                  {
                    (
                      categories.find(
                        (category) => category.id === transaction.categoryId
                      ) || {}
                    ).name
                  }
                </div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default connect((state) => ({
  transactions: state.budget.budget.transactions,
  categories: state.common.allCategories,
  budgetedCategories: state.budget.budgetedCategories,
  selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);
