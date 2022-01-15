const defaultState = {
    notes : [],
    loading : false
};

const noteReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'NOTE_LOADED':
            return {
                ...state,
                notes: action.payload,
                loading: false,
            };
        case 'NOTE_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'NOTE_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default noteReducer;
