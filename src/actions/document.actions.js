import documentServices from '../services/document.services'

// Return ve 1 ham. Nen duoc goi la higher order function

// function getMyDocument() {
//     return (dispatch) => {
//         dispatch({type: 'MY_DOCUMENT_LOADING',})
//         return documentServices.getMyDocument()
//             .then((result) => {
//                 dispatch({
//                     type: 'MY_DOCUMENT_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 dispatch({
//                     type: 'MY_DOCUMENT_FAILED',
//                 });
//             })
//     }
// }


function getTrash() {
    return (dispatch) => {
        dispatch({type: 'TRASH_LOADING',})
        return documentServices.getTrash()
            .then((result) => {
                dispatch({
                    type: 'TRASH_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'TRASH_FAILED',
                });
            })
    }
}

// function getDocumentById(docId) {
//     return (dispatch) => {
//         dispatch({type: 'SELECTED_DOCUMENT_LOADING',})
//         return documentServices.getResponseDocument(docId)
//             .then((result) => {
//                 dispatch({
//                     type: 'SELECTED_DOCUMENT_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: 'SELECTED_DOCUMENT_FAILED',
//                 });
//             })
//     }
// }

function getContent(docId) {
    return (dispatch) => {
        dispatch({type: 'CONTENT_DOCUMENT_LOADING',})
        return documentServices.getContent(docId)
            .then((result) => {
                dispatch({
                    type: 'CONTENT_DOCUMENT_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'CONTENT_DOCUMENT_FAILED',
                });
            })
    }
}

function getPendingDocument() {
    return (dispatch) => {
        dispatch({type: 'PENDING_DOCUMENT_LOADING',})
        return documentServices.getPendingDocument()
            .then((result) => {
                dispatch({
                    type: 'PENDING_DOCUMENT_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'PENDING_DOCUMENT_FAILED',
                });
            })
    }
}

function getPermissionDocumentOfUser() {
    return (dispatch) => {
        dispatch({type: 'PERMISSION_DOCUMENT_LOADING',})
        return documentServices.getPermissionDocumentOfUser()
            .then((result) => {
                dispatch({
                    type: 'PERMISSION_DOCUMENT_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'PERMISSION_DOCUMENT_FAILED',
                });
            })
    }
}

function getListUserGrantedPermission(docId) {
    return (dispatch) => {
        dispatch({type: 'PERMISSION_DOCUMENT_USER_LOADING',})
        return documentServices.getPermissionDocument(docId)
            .then((result) => {
                dispatch({
                    type: 'PERMISSION_DOCUMENT_USER_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'PERMISSION_DOCUMENT_USER_FAILED',
                });
            })
    }
}

function uploadDocument(file, categoriesId, folderId, type) {
    return () => {
        return documentServices.uploads(file, categoriesId, folderId, type)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function updateDocument(file, docId) {
    return () => {
        return documentServices.updates(file, docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result;
            })
    }
}

function renameDocument(docId, newName) {
    return () => {
        return documentServices.rename(docId, newName)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function lock(docId) {
    return () => {
        return documentServices.lock(docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function unlock(docId) {
    return () => {
        return documentServices.unlock(docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function subscribe(docId) {
    return () => {
        return documentServices.subscribes(docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function unsubscribe(docId) {
    return () => {
        return documentServices.unsubscribe(docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function approveDocument(docId) {
    return () => {
        return documentServices.approveDocument(docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function rejectDocument(docId) {
    return () => {
        return documentServices.rejectDocument(docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function deleteDocument(docId) {
    return () => {
        return documentServices.deleteDocument(docId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

const documentActions = {
    // getMyDocument,
    // getDocumentById,
    getPendingDocument,
    // getMyDocument,
    getTrash,
    getPermissionDocumentOfUser,
    getListUserGrantedPermission,
    approveDocument,
    rejectDocument,
    uploadDocument,
    updateDocument,
    renameDocument,
    getContent,
    lock,
    unlock,
    subscribe,
    unsubscribe,
    deleteDocument,

}

export default documentActions;