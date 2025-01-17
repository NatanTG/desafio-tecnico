import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/', 
  timeout: 5000, 
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });