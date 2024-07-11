import axios from 'axios';
import { getCookie } from '../helpers/cookie';

const env = import.meta.env;

const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
