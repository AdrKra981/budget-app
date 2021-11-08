import { useMemo } from "react";
import { formatCurrency } from "utils";
import {
  ParentCategoryContainer,
  CategoryAmount,
} from "./BudgetCategoryListStyles";

const ParentCategory = ({
  name,
  onClick,
  categories,
  transactions,
  amount,
}) => {
  const categoryLeftValue = useMemo(() => {
    if (!!amount) {
      return null;
    }
    const budgeted = (() => {
      try {
        return categories.reduce((acc, category) => acc + category.budget, 0);
      } catch (err) {
        return null;
      }
    })();

    const parentCategoryTransactions = transactions.filter((transaction) =>
      categories.find(
        (category) => category.categoryId === transaction.categoryId
      )
    );

    const spentOnParentCategories = parentCategoryTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    const totalLeft = budgeted ? budgeted - spentOnParentCategories : null;

    return totalLeft;
  }, [categories, transactions, amount]);

  const amountValue = useMemo(() => {
    return amount ? amount : categoryLeftValue;
  }, [amount])

  return (
    <ParentCategoryContainer onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount negative={amountValue < 0}>
        {formatCurrency(amountValue)}
      </CategoryAmount>
    </ParentCategoryContainer>
  );
};

export default ParentCategory;
