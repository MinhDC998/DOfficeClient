import { get, post } from './sender'

function createCategory(name) {
    return post(`/api/category/${name}`)
}

function getAll() {
    return get('/api/category')
}

function getResponseCategories() {
    return get('/api/category/response-category')
}

const categoryService = {
    createCategory,
    getAll,
    getResponseCategories,

    
}

export default categoryService