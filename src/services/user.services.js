import {get} from './sender';

function getAllUser() {
    return get('/api/admin/user-info');
}

function getAllStaff() {
    return get('/api/admin/staff');
}

function getUserNameById(userId){
    return get(`/api/admin/username/${userId}`);
}

function getStaffById(userId){
    return get(`/api/admin/staff/${userId}`);
}


const userServices = {
    getAllUser,
    getUserNameById,
    getAllStaff,
    getStaffById,
}

export default userServices;