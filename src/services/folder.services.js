import {get, post, put, del} from './sender'

function getResponseFolderEntity(folderId) {
    return get(`/api/folder/response-folder/${folderId}`)
}

function getFolderById(folderId) {
    return get(`/api/folder/${folderId}`)
}

function getMyDocumentFolderId() {
    return get('/api/folder/mydocument-id')
}

function getPublicFolderId() {
    return get('/api/folder/public-folder-id')
}

function createFolder(name, parentId) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('parentId', parentId)
    return post('/api/folder', formData)
}

function renameFolder(folderId, newName) {
    return put(`/api/folder/${folderId}/${newName}`)
}

function deletes(folderId) {
    return del(`/api/folder/${folderId}`)
}

const folderServices = {
    getResponseFolderEntity,
    getFolderById,
    getMyDocumentFolderId,
    getPublicFolderId,
    createFolder,
    renameFolder,
    deletes,

}

export default folderServices;