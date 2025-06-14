import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
