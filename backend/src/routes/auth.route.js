import express from 'express';
import {
  forgotPassword,
  login,
  resetPassword,
} from '../controllers/auth.controller.js';
import { validateDto } from '../middleware/validate.middleware.js';
import {
  forgotPasswordRequestDto,
  loginRequestDto,
  resetPasswordRequestDto,
} from '../dtos/auth.dto.js';

const router = express.Router();

router.post('/login', validateDto(loginRequestDto), login);
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
