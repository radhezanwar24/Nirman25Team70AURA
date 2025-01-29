import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (username: string, email: string, password: string) =>
  api.post('/auth/register', { username, email, password });

export const getUser = (id: string) => api.get(`/users/${id}`);

export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);

export const getAllSkills = () => api.get('/skills');

export const createSkill = (data: any) => api.post('/skills', data);

export default api;

