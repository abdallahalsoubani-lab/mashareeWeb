import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Projects
  getProjects: () => client.get('/projects'),
  getProject: (id) => client.get(`/projects/${id}`),
  createProject: (data) => client.post('/projects', data),
  updateProject: (id, data) => client.put(`/projects/${id}`, data),
  deleteProject: (id) => client.delete(`/projects/${id}`),

  // Auth
  login: (data) => client.post('/auth/login', data),
  register: (data) => client.post('/auth/register', data),
  getCurrentUser: () => client.get('/auth/me'),

  // Users
  getUsers: () => client.get('/users'),
  getUser: (id) => client.get(`/users/${id}`),
  getUserInvestments: (id) => client.get(`/users/${id}/investments`),
  invest: (userId, data) => client.post(`/users/${userId}/invest`, data),
};

export default client;
