import axiosInstance from '@/lib/axios';

export const createReservationService = async (data) => {
  const response = await axiosInstance.post('/reservations', data);
  return response.data;
};
