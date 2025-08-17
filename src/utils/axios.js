import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOCAL_URL = 'http://localhost:4040';

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
