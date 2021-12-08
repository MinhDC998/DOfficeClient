import {get, post} from './sender';

function getAll() {
    return get('/api/task');
}

function getTaskById(taskId) {
    return get(`/api/task/${taskId}`);
}

function getTaskByWorkId(workId) {
    return get(`/api/task/work/${workId}`);
}

function createTaskByForm(data) {
    return post(`/api/task`,data);
}




const taskServices = {
    getAll,
    getTaskById,
    createTaskByForm,
    getTaskByWorkId,
}

export default taskServices;