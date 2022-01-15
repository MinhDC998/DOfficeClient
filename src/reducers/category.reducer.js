const defaultState = {
    categories : [],
    allCategories : [],
    loading : false,
};

const categoryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CATEGORY_LOADED':
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case 'CATEGORY_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'CATEGORY_LOADING':
            return {
                ...state,
                loading: true,
            };
        
        case 'ALL_CATEGORY_LOADED':
            return {
                ...state,
                allCategories: action.payload,
                loading: false,
            };
        case 'ALL_CATEGORY_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'ALL_CATEGORY_LOADING':
            return {
                ...state,
                loading: true,
            };    
        default:
            return state;
    }
};

export default categoryReducer;
