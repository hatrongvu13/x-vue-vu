import axios from 'axios';
import {auth } from '@/utils/auth.js';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/x-platform/api',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      auth.logout();
    }
    return Promise.reject(err);
  }
)

export default api;
