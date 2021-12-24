import taskServices from '../services/task.services'

// Return ve 1 ham. Nen duoc goi la higher order function
function getAll() {
    return (dispatch) => {
        dispatch({ type: 'TASK_LOADING', })
        return taskServices.getAll()
            .then((result) => {
                dispatch({
                    type: 'TASK_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'TASK_FAILED',
                });
            })
    }
}

function getTaskByUser(userId) {
    return (dispatch) => {
        dispatch({ type: 'TASK_LOADING', })
        return taskServices.getTaskByUser(userId)
            .then((result) => {
                dispatch({
                    type: 'TASK_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'TASK_FAILED',
                });
            })
    }
}

function getTaskByWorkId(id) {
    return (dispatch) => {
        dispatch({ type: 'TASK_LOADING', })
        return taskServices.getTaskByWorkId(id)
            .then((result) => {
                dispatch({
                    type: 'TASK_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'TASK_FAILED',
                });
            })
    }
}

function getAssignByTaskId(id) {
    return (dispatch) => {
        dispatch({ type: 'TASK_ASSIGN_LOADING', })
        return taskServices.getAssignByTaskId(id)
            .then((result) => {
                dispatch({
                    type: 'TASK_ASSIGN_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'TASK_ASSIGN_FAILED',
                });
            })
    }
}

function getTaskById(id) {
    return (dispatch) => {
        dispatch({ type: 'TASK_DETAIL_LOADING', })
        return taskServices.getTaskById(id)
            .then((result) => {
                dispatch({
                    type: 'TASK_DETAIL_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'TASK_DETAIL_FAILED',
                });
            })
    }
}

// function getEditingOutGoingDispatchById(id) {
//     return (dispatch) => {
//         dispatch({type: 'EDITING_OUT_GOING_DISPATCH_LOADING',})
//         return outGoingDispatchServices.getOutGoingDispatchById(id)
//             .then((result) => {
//                 dispatch({
//                     type: 'EDITING_OUT_GOING_DISPATCH_LOADED',
//                     payload: result.data,
//                 });
//                 return result.data;
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: 'EDITING_OUT_GOING_DISPATCH_FAILED',
//                 });
//             })
//     }
// }


function createTaskByform(data) {
    return () => {
        return taskServices.createTaskByForm(data)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

// function updateTaskByForm(data,id) {
//     return () => {
//         return taskServices.
//             .then((result) => {
//                 if (result.code >= 400 && result.code <= 599) {
//                     throw new Error(result.message);
//                 }
//                 return result.data;
//             })
//     }
// }


// function deletetask(id) {
//     return () => {
//         return taskServices.
//             .then((result) => {
//                 if (result.code >= 400 && result.code <= 599) {
//                     throw new Error(result.message);
//                 }
//                 return result.data;
//             })
//     }
// }


// function sign(data) {
//     return () => {
//         return outGoingDispatchServices.sign(data)
//             .then((result) => {
//                 if (result.code >= 400 && result.code <= 599) {
//                     throw new Error(result.message);
//                 }
//                 if (result?.success === false) {
//                     throw new Error(result.message);
//                 }
//                 return result.data;
//             })
//     }
// }

//thêm nhân viên tham gia
function insertTaskAssign(taskId, userId) {
    return () => {
        return taskServices.insertTaskAssign(taskId, userId)
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

function removeTaskAssign(taskId, userId) {
    return () => {
        return taskServices.removeTaskAssign(taskId, userId)
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


const taskActions = {
    getAll,
    getTaskById,
    // updatetaskByForm,
    // deletetask,
    createTaskByform,
    getTaskByWorkId,
    getAssignByTaskId,
    insertTaskAssign,
    removeTaskAssign,
    getTaskByUser,

}

export default taskActions;