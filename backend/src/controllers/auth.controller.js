import { AdminResponseDto } from '../dtos/auth.dto.js';
import {
  forgotPasswordService,
  loginService,
  resetPasswordService,
} from '../services/auth.service.js';

/**
 * @desc    Đăng nhập Admin
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    const responseData = new AdminResponseDto(data, data.token)

    res.status(200).json({
      success: true,
      message: 'Login successfully.',
      data: responseData,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Yêu cầu gửi mã OTP quên mật khẩu
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await forgotPasswordService(email);

    return res.status(200).json({
      success: true,
      message: data.message,
      data: data,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Đặt lại mật khẩu mới
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const data = await resetPasswordService(email, otp, newPassword);

    return res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
