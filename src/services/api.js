import axios from 'axios';

import global from '../global';

export default api = axios.create({
    baseURL: 'http://api.web7sistemas.com'
});

api.interceptors.request.use(async (options) => {
    const token = await global.getToken();
    if(token)
        options.headers['Authorization'] = `Bearer ${token}`;
    options.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return options;
}, function (error) {
    console.log('Request error: ', error);
    return Promise.reject(error);
});

export const apiGitHub = axios.create({
    baseURL: 'https://api.github.com/users',
});