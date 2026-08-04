import axiosInstance from '@/lib/axios';

export const createContactService = async (data) => {
  const response = await axiosInstance.post('/contacts', data);
  return response.data;
};

export const getContactsService = async (params) => {
  const response = await axiosInstance.get('/contacts', { params });
  return response.data;
};

export const getContactByIdService = async (id) => {
  const response = await axiosInstance.get(`/contacts/${id}`);
  return response.data;
};

export const updateContactService = async (id, data) => {
  const response = await axiosInstance.patch(`/contacts/${id}`, data);
  return response.data;
};

export const deleteContactService = async (id) => {
  const response = await axiosInstance.delete(`/contacts/${id}`);
  return response.data;
};
