// axiosInstance.ts (create a separate file)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://volunteer-management-system-ybtz.onrender.com', // Replace with your backend URL
});

// Add a request interceptor to set the Authorization header for all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
