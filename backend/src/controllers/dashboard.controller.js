import { RES_CODE } from '../constants/responseCode.constant.js';
import {
  DashboardChartsResponseDto,
  DashboardStatsResponseDto,
} from '../dtos/dashboard.dto.js';
import { getDashboardChartsService, getDashboardStatsService } from '../services/dashboard.service.js';
import { formatResponse } from '../utils/response.util.js';

/**
 * @desc    Admin lấy số liệu tổng quát cho Dashboard
 * @route   GET /api/dashboard/stats
 * @access  Private/Admin
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await getDashboardStatsService();
    const responseData = new DashboardStatsResponseDto(data);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Dashboard stats retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin lấy dữ liệu biểu đồ
 * @route   GET /api/dashboard/charts
 * @access  Private/Admin
 */
export const getDashboardCharts = async (req, res, next) => {
  try {
    const { range } = req.query;
    const data = await getDashboardChartsService(range);
    const responseData = new DashboardChartsResponseDto(data);
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Dashboard charts data retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};
