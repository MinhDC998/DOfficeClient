import documentServices from "../services/document.services";

// Return ve 1 ham. Nen duoc goi la higher order function
function getVersionOfDocument(docId) {
    return (dispatch) => {
        dispatch({type: 'VERSION_LOADING',})
        return documentServices.getVersionsOfDocument(docId)
            .then((result) => {
                dispatch({
                    type: 'VERSION_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'VERSION_FAILED',
                });
            })
    }
}


function getActualVersion(docId) {
    return (dispatch) => {
        dispatch({type: 'ACTUAL_VERSION_LOADING',})
        return documentServices.getActualVersion(docId)
            .then((result) => {
                dispatch({
                    type: 'ACTUAL_VERSION_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'ACTUAL_VERSION_FAILED',
                });
            })
    }
}

function restoreVersion(docId, versionName) {
    return () => {
        return documentServices.restoreVersion(docId, versionName)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

const versionActions = {
    getVersionOfDocument,
    getActualVersion,
    restoreVersion,

}

export default versionActions;