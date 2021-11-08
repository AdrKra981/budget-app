import { ParentCategoryContainer } from "./BudgetCategoryListStyles";

const ParentCategory = ({name, onClick}) => {
    return(
        <ParentCategoryContainer onClick={onClick}>
            {name}
        </ParentCategoryContainer>
    );   
}

export default ParentCategory;