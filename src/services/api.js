import axios from 'axios';

import global from '../global';

export default (api = axios.create({
  baseURL: 'http://192.168.0.101:8080',
}));

api.interceptors.request.use(
  async (options) => {
    const token = await global.getToken();
    if (token) options.headers.Authorization = `Bearer ${token}`;
    options.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return options;
  },
  (error) => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);

export const apiGitHub = axios.create({
  baseURL: 'https://api.github.com/users',
});
