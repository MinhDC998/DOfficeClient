const defaultState = {
    permissions : [],
    permissionOfUsers: [],
    loading : false,
};

const permissionDocumentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'PERMISSION_DOCUMENT_LOADED':
            return {
                ...state,
                permissions: action.payload,
                loading: false,
            };
        case 'PERMISSION_DOCUMENT_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'PERMISSION_DOCUMENT_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'PERMISSION_DOCUMENT_USER_LOADED':
            return {
                ...state,
                permissionOfUsers: action.payload,
                loading: false,
            };
        case 'PERMISSION_DOCUMENT_USER_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'PERMISSION_DOCUMENT_USER_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default permissionDocumentReducer;
