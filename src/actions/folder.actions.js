import folderServices from "../services/folder.services";

// Return ve 1 ham. Nen duoc goi la higher order function
function getResponseFolderEntity(folderId) {
    return (dispatch) => {
        dispatch({type: 'FOLDER_LOADING',})
        return folderServices.getResponseFolderEntity(folderId)
            .then((result) => {
                dispatch({
                    type: 'FOLDER_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'FOLDER_FAILED',
                });
            })
    }
}


function getMyDocumentFolderId() {
    return (dispatch) => {
        dispatch({type: 'MY_DOCUMENT_ID_LOADING',})
        return folderServices.getMyDocumentFolderId()
            .then((result) => {
                dispatch({
                    type: 'MY_DOCUMENT_ID_LOADED',
                    payload: result.data,
                });
                // console.log(11111, result.data);
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'MY_DOCUMENT_ID_FAILED',
                });
            })
    }
}


function getPublicFolderId() {
    return (dispatch) => {
        dispatch({type: 'PUBLIC_ID_LOADING',})
        return folderServices.getPublicFolderId()
            .then((result) => {
                dispatch({
                    type: 'PUBLIC_ID_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: 'PUBLIC_ID_FAILED',
                });
            })
    }
}

// function getAllReleaseDepartment() {
//     return (dispatch) => {
//         dispatch({type: 'RELEASE_DEPARTMENT_LOADING',})
//         return comingDispatchServices.getAllReleaseDepartment()
//             .then((result) => {
//                 dispatch({
//                     type: 'RELEASE_DEPARTMENT_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 dispatch({
//                     type: 'RELEASE_DEPARTMENT_FAILED',
//                 });
//             })
//     }
// }

function createFolder(name, parentId) {
    return () => {
        return folderServices.createFolder(name, parentId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function renameFolder(folderId, newName) {
    return () => {
        return folderServices.renameFolder(folderId, newName)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function deletes(folderId) {
    return () => {
        return folderServices.deletes(folderId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

const folderActions = {
    getResponseFolderEntity,
    getMyDocumentFolderId,
    getPublicFolderId,
    createFolder,
    renameFolder,
    deletes,

}

export default folderActions;