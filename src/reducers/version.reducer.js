const defaultState = {
    versions : [],
    loading : false,
    actualVersion: undefined
};

const versionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'VERSION_LOADED':
            return {
                ...state,
                versions: action.payload,
                loading: false,
            };
        case 'VERSION_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'VERSION_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'ACTUAL_VERSION_LOADED':
            return {
                ...state,
                actualVersion: action.payload,
                loading: false,
            };
        case 'ACTUAL_VERSION_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'ACTUAL_VERSION_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default versionReducer;
