
import axios from 'axios';

// Create an axios instance for protected routes (requiring authentication)
export const protectedAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to attach auth token to requests
protectedAxiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or another auth storage mechanism
    const token = localStorage.getItem('authToken');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
protectedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error responses (e.g., 401, 403, etc.)
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        console.error('Unauthorized request. Redirecting to login...');
        // Implementation of redirect or auth refresh logic
      }
    }
    
    return Promise.reject(error);
  }
);

export default {
  protectedAxiosInstance
};
