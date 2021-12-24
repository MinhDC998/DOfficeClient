import { get, post, put, del } from './sender';

function getAll() {
    return get('/api/meeting');
}

function getMeetingById(meetingId) {
    return get(`/api/meeting/${meetingId}`);
}

function createMeetingByForm(data) {
    return post(`/api/meeting`, data);
}

function getAttendByMeetingId(meetingId) {
    return get(`/api/meeting/attend/${meetingId}`);
}

function getAttendByUserId(userId) {
    return get(`/api/meeting/user/${userId}`);
}

function updateMeetingByForm(data, meetingId) {
    return put(`/api/meeting/${meetingId}`, data);
}

function updateMeetingDetail(data, meetingId) {
    return put(`/api/meeting/update/${meetingId}`, data);
}

function deleteMeetingById(meetingId) {
    return del(`/api/meeting/${meetingId}`);
}






const meetingServices = {
    getAll,
    getMeetingById,
    createMeetingByForm,
    getAttendByMeetingId,
    updateMeetingByForm,
    updateMeetingDetail,
    getAttendByUserId,
    deleteMeetingById,

}

export default meetingServices;