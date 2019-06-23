import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api.web7sistemas.com'
});

export default api;