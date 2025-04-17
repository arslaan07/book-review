import axios from 'axios';
import { FaTruckFieldUn } from 'react-icons/fa6';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default api;