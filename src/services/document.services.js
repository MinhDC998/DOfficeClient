import { get, post, put, del } from './sender';

function getAll() {
    return get('/api/document/')
}

function getDocumentApproved() {
    return get('/api/document/approved')
}

function getPendingDocument() {
    return get('/api/document/pending')
}

function getDocumentById(docId) {
    return get(`/api/document/by-id/${docId}`)
}

function getPrivateDocument() {
    return get('/api/document/private')
}

function getDocumentByNameAndTime(name, beginDate, endDate) {
    return get(`/api/document/advanced-search/name=${name}/begin=${beginDate}/end=${endDate}`)
}

function advancedSearch(name, beginDate, endDate, keywords) {
    return get(`/api/document/search/name=${name}/begin=${beginDate}/end=${endDate}/keywords=${keywords}`)
}

function getDocumentsByCategoryId(categoryId) {
    return get(`/api/document/by-category/${categoryId}`)
}

function getMyDocument() {
    return get('/api/document/mydocument')
}

function getListNote(docId) {
    return get(`/api/document/notes/${docId}`)
}

function getActualVersion(docId) {
    return get(`/api/document/actual-version/${docId}`)
}

function getVersionsOfDocument(docId) {
    return get(`/api/document/versions/${docId}`)
}

function getTrash() {
    return get('/api/document/trash')
}

function downloadDocument(docId) {
    return get(`/api/document/download/${docId}`)
}

// function getContent(name) {
//     return get(`/api/document/by-name/${name}`)
// }

function getContent(docId) {
    return get(`/api/document/content/${docId}`)
}

function getResponseDocument(docId) {
    return get(`/api/document/response-document/${docId}`)
}

function getListKeyword(docId) {
    return get(`/api/document/keywords/${docId}`)
}

function getListSubscriber(docId) {
    return get(`/api/document/subscribers/${docId}`)
}

function uploads(file, categoriesId, folderId, type) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('categoriesId', categoriesId)
    formData.append('type', type)
    formData.append('folderId', folderId)

    return post('/api/document', formData)
}

function updates(file, docId) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('docId', docId)
    
    return put('/api/document', formData)
}

function addNewKeyword(keywords, docId) {
    const formData = new FormData()
    formData.append('keywords', keywords)
    formData.append('docId', docId)
    console.log(keywords, docId)
    return post('/api/document/addkeyword', formData)
}

function subscribes(docId) {
    return post(`/api/document/subscribe/${docId}`)
}

function unsubscribe(docId) {
    return put(`/api/document/unsubscribe/${docId}`)
}

function rename(docId, newName) {
    return put(`/api/document/rename/${docId}/${newName}`)
}

function restoreDocument(docId) {
    const data = new FormData()
    data.append('docId', docId)
    console.log(docId)
    return put('/api/document/restore-document', data)
}

function restoreVersion(docId, version) {
    return put(`/api/document/restore/${docId}/${version}`)
}

function lock(docId) {
    return post(`/api/document/lock/${docId}`)
}

function unlock(docId) {
    return put(`/api/document/unlock/${docId}`)
}

function getLockInfo(docId) {
    return get(`/api/document/lock-info/${docId}`)
}

function getPermissionDocument(docId) {
    return get(`/api/document/permission/${docId}`)
}

function grantPermissionDocument(docId, listUserGrant) {
    const formData = new FormData()
    formData.append('docId', docId)
    formData.append('listUsers', JSON.stringify(listUserGrant))
    return post(`/api/document/grant-permission`, formData)
}

function updatePermissionDocument(docId, username, listPermission) {
    const formData = new FormData()
    formData.append('docId', docId)
    formData.append('username', username)
    // formData.append('listPermission', JSON.stringify(listPermission))
    formData.append('listPermission', listPermission)
    return put('/api/document/update-permission', formData)
} 

function getPermissionDocumentOfUser() {
    return get('/api/document/permission-document')
}

function shareDocument(docId, listUserShare) {
    const formData = new FormData()
    formData.append('docId', docId)
    formData.append('listUserShare', listUserShare)
    return post('/api/document/share', formData)
}

function reportToAdmin(docId) {
    return post(`/api/document/report-to-admin/${docId}`)
}

function approveDocument(docId) {
    return put(`/api/document/approve-document/${docId}`)
}

function rejectDocument(docId) {
    return del(`/api/document/reject-document/${docId}`)
}

function purgeDelete(docId) {
    return del(`/api/document/purge-delete/${docId}`)
}

function deleteDocument(docId) {
    return del(`/api/document/${docId}`)
}

function getAllUser() {
    return get('/api/all-user')
}

const documentServices = {
    getAll,
    getDocumentApproved,
    getPendingDocument,
    getDocumentById,
    getPrivateDocument,
    getMyDocument,
    advancedSearch,
    getDocumentsByCategoryId,
    getDocumentByNameAndTime,
    getListNote,
    getActualVersion,
    getVersionsOfDocument,
    getContent,
    getResponseDocument,
    getListSubscriber,
    getListKeyword,
    downloadDocument,
    getTrash,
    uploads,
    updates,
    addNewKeyword,
    subscribes,
    unsubscribe,
    lock,
    unlock,
    getLockInfo,
    rename,
    restoreVersion,
    restoreDocument,
    getPermissionDocument,
    getPermissionDocumentOfUser,
    grantPermissionDocument,
    updatePermissionDocument,
    shareDocument,
    reportToAdmin,
    approveDocument,
    rejectDocument,
    purgeDelete,
    deleteDocument,
    getAllUser,
}

export default documentServices;