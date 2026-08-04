import axiosInstance from '@/lib/axios';

export const createReservationService = async (data) => {
  const response = await axiosInstance.post('/reservations', data);
  return response.data;
};

export const getReservationService = async (params) => {
  const response = await axiosInstance.get('/reservations', { params });
  return response.data;
};

export const getReservationByIdService = async (id) => {
  const response = await axiosInstance.get(`/reservations/${id}`);
  return response.data;
};

export const updateReservationStatusService = async (id, status) => {
  const response = await axiosInstance.patch(`/reservations/${id}/status`, {
    status,
  });

  return response.data;
};

export const updateReservationService = async (id, data) => {
  const response = await axiosInstance.patch(`reservations/${id}`, data);
  return response.data;
};

export const deleteReservationService = async (id) => {
  const response = await axiosInstance.delete(`/reservations/${id}`);
  return response.data;
};
