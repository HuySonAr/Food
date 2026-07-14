import express from 'express';
import {
  forgotPassword,
  login,
  logout,
  refresh,
  resetPassword,
} from '../controllers/auth.controller.js';
import { validateDto } from '../middleware/validate.middleware.js';
import {
  forgotPasswordRequestDto,
  loginRequestDto,
  resetPasswordRequestDto,
} from '../dtos/auth.dto.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', validateDto(loginRequestDto), login);
router.post('/refresh', refresh);
router.post('/logout', protect, restrictTo('admin'), logout);
router.post(
  '/forgot-password',
  validateDto(forgotPasswordRequestDto),
  forgotPassword,
);
router.post(
  '/reset-password',
  validateDto(resetPasswordRequestDto),
  resetPassword,
);

export default router;
