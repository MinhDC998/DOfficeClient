import meetingServices from '../services/meeting.services'

// Return ve 1 ham. Nen duoc goi la higher order function
function getAll() {
    return (dispatch) => {
        dispatch({ type: 'MEETING_LOADING', })
        return meetingServices.getAll()
            .then((result) => {
                dispatch({
                    type: 'MEETING_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'MEETING_FAILED',
                });
            })
    }
}

function getMeetingById(id) {
    return (dispatch) => {
        dispatch({ type: 'MEETING_DETAIL_LOADING', })
        return meetingServices.getMeetingById(id)
            .then((result) => {
                dispatch({
                    type: 'MEETING_DETAIL_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'MEETING_DETAIL_FAILED',
                });
            })
    }
}

function getAssignByMeetingId(id) {
    return (dispatch) => {
        dispatch({ type: 'ATTENDEES_LOADING', })
        return meetingServices.getAttendByMeetingId(id)
            .then((result) => {
                dispatch({
                    type: 'ATTENDEES_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'ATTENDEES_FAILED',
                });
            })
    }
}

function getAssignByUserId(id) {
    return (dispatch) => {
        dispatch({ type: 'ATTEND_LOADING', })
        return meetingServices.getAttendByUserId(id)
            .then((result) => {
                dispatch({
                    type: 'ATTEND_LOADED',
                    payload: result.data,
                });
                return result.data;
            })
            .catch((err) => {
                dispatch({
                    type: 'ATTEND_FAILED',
                });
            })
    }
}





function createMeetingByForm(data) {
    return () => {
        return meetingServices.createMeetingByForm(data)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}

function updateMeetingByForm(data, id) {
    return () => {
        return meetingServices.updateMeetingByForm(data, id)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}
function updateMeetingDetail(data, id) {
    return () => {
        return meetingServices.updateMeetingDetail(data, id)
            .then((result) => {
                if (result.code >= 400 && result.code <= 599) {
                    throw new Error(result.message);
                }
                return result.data;
            })
    }
}


// //thêm nhân viên tham gia
// function insertTaskAssign(taskId, userId) {
//     return () => {
//         return taskServices.insertTaskAssign(taskId, userId)
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

// function removeTaskAssign(taskId, userId) {
//     return () => {
//         return taskServices.removeTaskAssign(taskId, userId)
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


const meetingActions = {
    getAll,
    getMeetingById,
    createMeetingByForm,
    getAssignByMeetingId,
    updateMeetingByForm,
    updateMeetingDetail,
    getAssignByUserId,



}

export default meetingActions;