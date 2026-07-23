import axios from 'axios';

// Create configured Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.sagarm.shop/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Request Interceptor (Inject Auth Token if present)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sagarm_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Global Error Handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized session
      localStorage.removeItem('sagarm_auth_token');
    }
    return Promise.reject(error);
  }
);

export default api;
