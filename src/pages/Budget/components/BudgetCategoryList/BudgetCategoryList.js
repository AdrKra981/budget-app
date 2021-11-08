import { connect } from "react-redux";
import { groupBy } from "lodash";
import ToggleableList from "components/ToggleableList";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

const BudgetCategoryList = ({ budgetedCategories, allCategories }) => {
    const budgetedCategoriesByParent = groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.categoryId).parentCategory.name);

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({onClick}) => (
            <ParentCategory 
                name={parentName}
                onClick={() => onClick(parentName)}
            />
        ),
        children: categories.map(category => {
            const {name} = allCategories.find(item => item.id === category.categoryId);
            return(
            <CategoryItem 
                key={category.id}
                name={name}
            />
            )
            })
    }));
    return(
        <ul>
            <ToggleableList items={listItems}/>
        </ul>
    );
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList);