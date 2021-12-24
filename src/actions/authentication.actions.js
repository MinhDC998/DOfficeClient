import authenticateServices from "../services/authenticate.services";
import Cookie from "js-cookie";
import userServices from "../services/user.services";

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
                payload: username,
            });
            Cookie.set('authToken', res.jwtToken);
        } catch (e) {
            throw e;
        }
    }
}

function getRoleOfUser(userId) {
    return (dispatch) => {
        dispatch({ type: 'ROLE_LOADING', })
        return userServices.getRoleOfUser(userId)
            .then((result) => {
                dispatch({
                    type: 'ROLE_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'ROLE_FAILED',
                });
            })
    }
}

const authenticationActions = {
    validateToken,
    authenticate,

    getRoleOfUser,
};

export default authenticationActions;
