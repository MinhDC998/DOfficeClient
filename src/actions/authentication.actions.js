import authenticateServices from "../services/authenticate.services";
import Cookie from "js-cookie";

function validateToken() {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            if (state.authentication.userLoaded) {
                return;
            }
            const response = await authenticateServices.validateToken();
            dispatch({
                type: 'AUTHENTICATION_VALIDATED',
                payload: response.data,
            });
        } catch (e) {
            console.log(e);
            dispatch({
                type: 'AUTHENTICATION_VALIDATE_FAILED',
            });
            throw e;
        }
    };
}

function authenticate(username, password) {
    return async (dispatch) => {
        try {
            const res = await authenticateServices.authenticate(username, password);
            dispatch({
                type: 'AUTHENTICATION_LOGGED_IN',
                payload: res.userEntity,
            });
            Cookie.set('authToken', res.jwtToken);
        } catch (e) {
            throw e;
        }
    }
}

const authenticationActions = {
    validateToken,
    authenticate,
};

export default authenticationActions;
