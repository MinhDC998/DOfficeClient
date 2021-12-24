const defaultState = {
    user: undefined,
    userLoaded: false,
    role: undefined,
};

const authenticationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'AUTHENTICATION_VALIDATED':
            return {
                ...state,
                user: action.payload,
                userLoaded: true,
            };
        case 'AUTHENTICATION_VALIDATE_FAILED':
            return {
                ...state,
                userLoaded: true,
            };
        case 'AUTHENTICATION_LOGGED_IN':
            return {
                ...state,
                user: action.payload,
            };
        case 'ROLE_LOADED':
            return {
                ...state,
                role: action.payload,
                userLoaded: true,
            };
        case 'ROLE_FAILED':
            return {
                ...state,
                userLoaded: true,
            };
        case 'ROLE_LOADING':
            return {
                ...state,
                userLoaded: false,
            };
        default:
            return state;
    }
};

export default authenticationReducer;
