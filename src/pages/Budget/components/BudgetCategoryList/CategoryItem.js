import { formatCurrency } from "utils";
import {
  CategoryAmount,
  CategoryItemContainer,
} from "./BudgetCategoryListStyles";

const CategoryItem = ({ name, item, transactions }) => {
  const categoryTransactions = transactions.filter(
    (transaction) => transaction.categoryId === item.id
  );
  const spentOnCategory = categoryTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalLeft = item.budget - spentOnCategory;

  return (
    <CategoryItemContainer>
      <span>{name}</span>
      <CategoryAmount negative={totalLeft < 0}>{formatCurrency(totalLeft)}</CategoryAmount>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
