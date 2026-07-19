import axios from 'axios';
import axiosInstance from '../lib/axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const loginService = (email, password) => {
  return axiosInstance.post(
    '/auth/login',
    { email, password },
    { skipAuthRefresh: true },
  );
};

export const logoutService = () => {
  return axiosInstance.post('/auth/logout');
};

export const refreshTokenService = async () => {
  const response = await axios.post(
    `${BASE_URL}/auth/refresh`,
    {},
    { withCredentials: true },
  );
  return response.data.data.accessToken;
};

export const getMeService = async () => {
  return axiosInstance.get('/auth/me');
};
