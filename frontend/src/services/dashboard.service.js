import axiosInstance from '@/lib/axios';

export const getDashboardStatsService = async () => {
  const response = await axiosInstance.get('/dashboard/stats');
  return response.data;
};

export const getDashboardChartsService = async (range) => {
  const response = await axiosInstance.get('dashboard/charts', {
    params: { range },
  });

  return response.data;
};
