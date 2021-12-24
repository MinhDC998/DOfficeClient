import userServices from "../services/user.services";

function getAllStaff() {
    return (dispatch) => {
        dispatch({ type: 'STAFF_LOADING', })
        return userServices.getAllStaff()
            .then((result) => {
                dispatch({
                    type: 'STAFF_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'STAFF_FAILED',
                });
            })
    }
}

const staffActions = {
    getAllStaff
}

export default staffActions;