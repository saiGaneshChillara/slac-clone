import axios from 'axios';

const BASE_URL = "https://slac-clone-backend.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;