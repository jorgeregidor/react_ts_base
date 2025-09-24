import axios from 'axios';
import backendRoutes from './routes'


const http = axios.create({
  baseURL: backendRoutes.baseUrl
});

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


http.interceptors.response.use(
  response => response.data,
  error => {
    const status = error.response?.status;
    if (status === 401 && !window.location.href.includes('login')) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.resolve();
    } else {
      return Promise.reject(error);
    }
  }
);


export default http;