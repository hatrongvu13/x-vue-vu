import axios from 'axios';
import { useAuth } from '@/stores/auth.js'

const { logout } = useAuth();
const api = axios.create({
  baseURL: 'https://api.jaxtony.store/x-platform/api',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      logout()
    }
    return Promise.reject(err);
  }
)

export default api;
