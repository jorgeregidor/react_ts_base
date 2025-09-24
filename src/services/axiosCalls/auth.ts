import axios, { AxiosInstance } from 'axios';
import backendRoutes from '../routes'

const auth: AxiosInstance = axios.create({
  baseURL: backendRoutes.baseUrl
});

// auth.interceptors.request.use(
//   config => {
//     console.debug('Handling request interceptor');
//     const token = localStorage.getItem('user-access-token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );


auth.interceptors.response.use(
  response => response.data
);

export default auth;