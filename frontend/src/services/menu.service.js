import axiosInstance from '@/lib/axios';

export const getPublicProductsService = async (params) => {
  const response = await axiosInstance.get('/products', { params });
  return response.data;
};
