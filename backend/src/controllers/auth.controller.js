import { RES_CODE } from '../constants/responseCode.constant.js';
import { AdminResponseDto } from '../dtos/auth.dto.js';
import {
  forgotPasswordService,
  loginService,
  resetPasswordService,
} from '../services/auth.service.js';
import { formatResponse } from '../utils/response.util.js';

/**
 * @desc    Đăng nhập Admin
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    const responseData = new AdminResponseDto(data, data.token);

    res
      .status(200)
      .json(
        formatResponse(RES_CODE.SUCCESS, 'Login successfully.', responseData),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Yêu cầu gửi mã OTP quên mật khẩu
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await forgotPasswordService(email);

    return res
      .status(200)
      .json(formatResponse(RES_CODE.SUCCESS, data.message, data));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Đặt lại mật khẩu mới
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const data = await resetPasswordService(email, otp, newPassword);

    return res.status(200).json(formatResponse(RES_CODE.SUCCESS, data.message));
  } catch (error) {
    next(error);
  }
};
