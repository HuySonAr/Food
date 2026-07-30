import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { getDashboardStats } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/stats', getDashboardStats);

export default router;
