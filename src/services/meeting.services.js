import {get, post} from './sender';

function getAll() {
    return get('/api/meeting');
}

function getMeetingById(meetingId) {
    return get(`/api/meeting/${meetingId  }`);
}

function createMeetingByForm(data) {
    return post(`/api/meeting`,data);
}




const meetingServices = {
    getAll,
    getMeetingById,
    createMeetingByForm,

}

export default meetingServices;