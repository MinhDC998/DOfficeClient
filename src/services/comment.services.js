import { get, post, put, del } from './sender'

function getCommentById(commentId) {
    return get(`/api/comment/${commentId}`)
}

function createCommentApi(versionId, text, parentId) {
    const formData = new FormData()
    formData.append('parentId', parentId)
    formData.append('versionId', versionId)
    formData.append('text', text)
    return post('/api/comment', formData)
}

function getListCommentOfVersion(versionId) {
    return get(`/api/comment/versionid=${versionId}`)
}

function updateCommentApi(text, commentId) {
    return put(`/api/comment/update/${commentId}`, text)
}

function deleteCommentApi(commentId) {
    return del(`/api/comment/${commentId}`)
}

const commentServices = {
    getCommentById,
    createCommentApi,
    getListCommentOfVersion,
    updateCommentApi,
    deleteCommentApi,
}

export default commentServices