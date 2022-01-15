
// Return ve 1 ham. Nen duoc goi la higher order function
import categoryService from "../services/category.services";

function getResponseCategories() {
    return (dispatch) => {
        dispatch({type: 'CATEGORY_LOADING',})
        return categoryService.getResponseCategories()
            .then((result) => {
                dispatch({
                    type: 'CATEGORY_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'CATEGORY_FAILED',
                });
            })
    }
}

function getAllCategories() {
    return (dispatch) => {
        dispatch({type: 'ALL_CATEGORY_LOADING',})
        return categoryService.getAll()
            .then((result) => {
                dispatch({
                    type: 'ALL_CATEGORY_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'ALL_CATEGORY_FAILED',
                });
            })
    }
}

function createCategory(name) {
    return () => {
        return categoryService.createCategory(name)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

const categoryActions = {
    getResponseCategories,
    getAllCategories,
    createCategory,
}

export default categoryActions;