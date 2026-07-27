import axiosInstance from '@/lib/axios';

export const getBlogsService = async (params) => {
  const response = await axiosInstance.get('/blogs', { params });
  return response.data;
};

export const getBlogBySlugService = async (slug) => {
  const response = await axiosInstance.get(`/blogs/slug/${slug}`);
  return response.data;
};
