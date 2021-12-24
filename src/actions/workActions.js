import workServices from '../services/work.services'

// Return ve 1 ham. Nen duoc goi la higher order function
function getAll() {
    return (dispatch) => {
        dispatch({ type: 'WORK_LOADING', })
        return workServices.getAll()
            .then((result) => {
                dispatch({
                    type: 'WORK_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'WORK_FAILED',
                });
            })
    }
}

function getAllStoredWorks() {
    return (dispatch) => {
        dispatch({ type: 'WORK_LOADING', })
        return workServices.getAllStoredWorks()
            .then((result) => {
                dispatch({
                    type: 'WORK_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'WORK_FAILED',
                });
            })
    }
}
function getWorkByUserId(userId) {
    return (dispatch) => {
        dispatch({ type: 'WORK_LOADING', })
        return workServices.getWorkByUserId(userId)
            .then((result) => {
                dispatch({
                    type: 'WORK_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'WORK_FAILED',
                });
            })
    }
}

function getWorkById(id) {
    return (dispatch) => {
        dispatch({ type: 'WORK_DETAIL_LOADING', })
        return workServices.getWorkById(id)
            .then((result) => {
                dispatch({
                    type: 'WORK_DETAIL_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'WORK_DETAIL_FAILED',
                });
            })
    }
}
function getAssignsByWorkId(id) {
    return (dispatch) => {
        dispatch({ type: 'ASSIGN_LOADING', })
        return workServices.getAssignByWorkId(id)
            .then((result) => {
                dispatch({
                    type: 'ASSIGN_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'ASSIGN_FAILED',
                });
            })
    }
}


function createWorkByform(data) {
    return () => {
        return workServices.createWorkByForm(data)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}
//Cập nhật theo form
function updateWorkByForm(data, id) {
    return () => {
        return workServices.updateWork(data, id)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

//Cập nhật theo form
function updateWorkDetail(data, id) {
    return () => {
        return workServices.updateWorkDetail(data, id)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

//xoá công việc
function deleteWork(id) {
    return () => {
        return workServices.deleteWork(id)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

//thêm nhân viên tham gia
function insertWorkAssign(workId, userId) {
    return () => {
        return workServices.insertWorkAssign(workId, userId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                if (result?.success === false) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

//Xoá tham gia
function removeWorkAssign(workId, userId) {
    return () => {
        return workServices.removeWorkAssign(workId, userId)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                if (result?.success === false) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}


const workActions = {
    getAll,
    getWorkById,
    updateWorkByForm,
    deleteWork,
    createWorkByform,
    getAssignsByWorkId,
    insertWorkAssign,
    removeWorkAssign,
    getWorkByUserId,
    updateWorkDetail,
    getAllStoredWorks,

}

export default workActions;