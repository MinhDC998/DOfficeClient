import { get, post, put, del } from './sender';

function getWorkComment(workId) {
    return get(`/api/comment/work/${workId}`);
}

function getTaskComment(taskId) {
    return get(`/api/comment/task/${taskId}`);
}


function findCommentById(commentId) {
    return get(`/api/comment/${commentId}`);
}


function updateCommentApi(data, commentId) {
    return put(`/api/comment/${commentId}`, data);
}

function createCommentApi(data) {
    return post(`/api/comment/`, data);
}

function deleteCommentApi(commentId) {
    return del(`/api/comment/${commentId}`);
}






const commentServices = {
   getWorkComment,
   getTaskComment,
   createCommentApi,
   updateCommentApi,
   deleteCommentApi,
   findCommentById,


}

export default commentServices;