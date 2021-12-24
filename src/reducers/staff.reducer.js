const initialState = {
    staffs: [],
    loading: false,
};

const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STAFF_LOADED':
            return {
                ...state,
                staffs: action.payload,
                loading: false,
            };
        case 'STAFF_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'STAFF_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default staffReducer;
