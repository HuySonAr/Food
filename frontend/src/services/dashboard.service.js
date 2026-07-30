import axiosInstance from "@/lib/axios"

export const getDashboardStatsService = async () => {
    const response = await axiosInstance.get("/dashboard/stats")
    return response.data;
}