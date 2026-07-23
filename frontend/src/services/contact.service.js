import axiosInstance from '@/lib/axios';

export const createContactService = async (data) => {
  const response = await axiosInstance.post('/contacts', data);
  return response.data;
};
