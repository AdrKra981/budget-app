export const getAllCategories = (id) => async (dispatch) => {
    dispatch({
      type: ALL_CATEGORIES_GET_REQUEST,
    });
    try {
      const response = await getBudgetCategories(id);
      const data = await response.json();
      dispatch({
        type: ALL_CATEGORIES_GET_SUCCESS,
        payload: {
          budget: data,
        },
      });
    } catch (err) {
      dispatch({
        type: ALL_CATEGORIES_GET_FAILED,
      });
    }
  };
  