import { CategoryItemContainer } from "./BudgetCategoryListStyles";

const CategoryItem = ({ name }) => {
  return (
    <CategoryItemContainer>
      <span>{name}</span>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
