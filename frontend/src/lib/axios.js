import axios from 'axios';
import { refreshTokenService } from '../services/auth.service';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let memoryToken = null;

export const setAccessToken = (token) => {
  memoryToken = token;
};

export const getAccessToken = () => memoryToken;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  isRefreshing = false;
  failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  if (memoryToken) {
    config.headers.Authorization = `Bearer ${memoryToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshTokenService();
        setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (error) {
        setAccessToken(null);
        processQueue(error, null);

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
