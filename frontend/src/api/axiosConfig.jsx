import axios from "axios";
const env = import.meta.env;
const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = 'Bearer ' + token;
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
    if (error.response.status === 401) {
      // window.location = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
