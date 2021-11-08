export const getAllCategories = () => {
    const promise = fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);

    return promise;
}
