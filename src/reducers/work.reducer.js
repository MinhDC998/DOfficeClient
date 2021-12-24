const initialState = {
    works: [],
    assigns: [],
    loading: false,
    workDetail: undefined,
};

const workReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'WORK_LOADED':
            return {
                ...state,
                works: action.payload,
                loading: false,
            };
        case 'WORK_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'ASSIGN_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'ASSIGN_LOADED':
            return {
                ...state,
                assigns: action.payload,
                loading: false,
            };
        case 'ASSIGN_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'WORK_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'WORK_DETAIL_LOADED':
            return {
                ...state,
                workDetail: action.payload,
                loading: false,
            };
        case 'WORK_DETAIL_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'WORK_DETAIL_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default workReducer;
