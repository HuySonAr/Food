import z from "zod";

export const getChartsQueryDto = z.object({
  range: z
    .enum(['week', 'month', 'year'])
    .optional()
    .default('week'),
});


export class DashboardStatsResponseDto {
  constructor(data) {
    this.reservations = {
      total: data.reservations.total || 0,
      percentChange: data.reservations.percentChange || 0,
      trend: data.reservations.trend || [0, 0, 0, 0, 0, 0, 0],
    };

    this.contacts = {
      total: data.contacts.total || 0,
      percentChange: data.contacts.percentChange || 0,
      trend: data.contacts.trend || [0, 0, 0, 0, 0, 0, 0],
    };

    this.products = {
      total: data.products.total || 0,
      percentChange: data.products.percentChange || 0,
      trend: data.products.trend || [0, 0, 0, 0, 0, 0, 0],
    };

    this.blogs = {
      total: data.blogs.total || 0,
      percentChange: data.blogs.percentChange || 0,
      trend: data.blogs.trend || [0, 0, 0, 0, 0, 0, 0],
    };
  }
}


export class DashboardChartsResponseDto {
  constructor(data){
    this.reservationTrend = data.trend;
    this.reservationStatus = data.status;
  }
}