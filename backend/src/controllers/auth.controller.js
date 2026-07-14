import { RES_CODE } from '../constants/responseCode.constant.js';
import { AdminResponseDto } from '../dtos/auth.dto.js';
import {
  forgotPasswordService,
  loginService,
  logoutService,
  refreshSessionService,
  resetPasswordService,
} from '../services/auth.service.js';
import { formatResponse } from '../utils/response.util.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/**
 * @desc    Đăng nhập Admin
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { admin, accessToken, refreshToken } = await loginService(
      email,
      password,
    );

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    const responseData = new AdminResponseDto(admin, accessToken);

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
 * @desc    Refresh Token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refresh = async (req, res, next) => {
  try {
    console.log("cookies",req.cookies)
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    console.log("refresh", token)

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshSessionService(token);

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);

    return res.status(200).json(
      formatResponse(RES_CODE.SUCCESS, 'Token refreshed successfully.', {
        accessToken,
      }),
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log out
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logout = async (req, res, next) => {
  try {
    if (req.admin?._id) {
      await logoutService(req.admin._id);
    }
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    return res
      .status(200)
      .json(formatResponse(RES_CODE.SUCCESS, 'Logged out successfully.'));
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
