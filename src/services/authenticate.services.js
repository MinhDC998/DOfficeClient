import {get, post} from './sender';

const validateToken = () => get('/validate-token');

const authenticate = (username, password) => {
    const infoLogin = post('/authenticate', { username, password })
    localStorage.setItem('username', username)
    return infoLogin
};

const authenticateServices = {
    validateToken,
    authenticate,
};

export default authenticateServices;
