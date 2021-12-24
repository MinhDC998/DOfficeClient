import {get, post,del,put} from './sender';

function getAll() {
    return get('/api/work');
}
function getAllStoredWorks() {
    return get('/api/work/stored');
}

function getWorkById(workId) {
    return get(`/api/work/${workId}`);
}

function getAssignByWorkId(workId) {
    return get(`/api/work/assign/${workId}`);
}

function getWorkByUserId(userId) {
    return get(`/api/work/user/${userId}`);
}


function createWorkByForm(data) {
    return post(`/api/work`,data);
}

function deleteWork(workId){
    return del(`/api/work/${workId}`);
}

function removeWorkAssign(workId,userId){
    return del(`/api/work/assign/workId=${workId}/userId=${userId}`);
}

function insertWorkAssign(workId,userId){
    return post(`/api/work/assign/workId=${workId}/userId=${userId}`);
}

function updateWork(data,workId){
    return put(`/api/work/${workId}`,data);
}

function updateWorkDetail(data,workId){
    return put(`/api/work/update/${workId}`,data);
}





const workServices = {
    getAll,
    getAllStoredWorks,
    getWorkById,
    createWorkByForm,
    deleteWork,
    updateWork,
    getAssignByWorkId,
    insertWorkAssign,
    removeWorkAssign,
    getWorkByUserId,
    updateWorkDetail,


}

export default workServices;