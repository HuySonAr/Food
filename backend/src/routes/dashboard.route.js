import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import {
  getDashboardCharts,
  getDashboardStats,
} from '../controllers/dashboard.controller.js';
import { validateQueryDto } from '../middleware/validate.middleware.js';
import { getChartsQueryDto } from '../dtos/dashboard.dto.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/stats', getDashboardStats);
router.get('/charts', validateQueryDto(getChartsQueryDto), getDashboardCharts);

export default router;
