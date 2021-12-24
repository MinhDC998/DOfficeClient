import {get, post,del,put} from './sender';

function getAll() {
    return get('/api/task');
}

function getTaskById(taskId) {
    return get(`/api/task/${taskId}`);
    
}

function getAssignByTaskId(taskId) {
    return get(`/api/task/assign/${taskId}`);
}


function getTaskByUser(userId) {
    return get(`/api/task/user/${userId}`);
}

function getTaskByWorkId(workId) {
    return get(`/api/task/work/${workId}`);
}

function createTaskByForm(data) {
    return post(`/api/task`,data);
}

function insertTaskAssign(taskId,userId) {
    return post(`/api/task/assign/taskId=${taskId}/userId=${userId}`);
}

function removeTaskAssign(taskId,userId) {
    return del(`/api/task/assign/taskId=${taskId}/userId=${userId}`);
}

function updateTask(taskId,data){
    return put(`/api/task/${taskId}`,data);

}




const taskServices = {
    getAll,
    getTaskById,
    createTaskByForm,
    getTaskByWorkId,
    getAssignByTaskId,
    insertTaskAssign,
    removeTaskAssign,
    getTaskByUser,
    updateTask,
}

export default taskServices;