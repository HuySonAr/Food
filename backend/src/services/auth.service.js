import crypto from 'crypto';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import { RES_CODE } from '../constants/responseCode.constant.js';

/**
 * @desc    Admin Login Service
 */
export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(
      'Please provide email and password.',
      400,
      RES_CODE.VALIDATION_ERROR,
    );
  }

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.matchPassword(password))) {
    throw new ApiError(
      'Invalid email or password.',
      401,
      RES_CODE.AUTH_INVALID_CREDENTIALS,
    );
  }

  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  admin.refreshToken = refreshToken;
  await admin.save();

  return {
    admin: {
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshSessionService = async (token) => {
  if (!token) {
    throw new ApiError(
      'Refresh token is required.',
      400,
      RES_CODE.VALIDATION_ERROR,
    );
  }

  try {
    const decoded = verifyRefreshToken(token);
    const admin = await Admin.findById(decoded.id);

    if (!admin || admin.refreshToken !== token) {
      throw new ApiError(
        'Invalid or reuse detected for refresh token.',
        401,
        RES_CODE.AUTH_UNAUTHORIZED,
      );
    }

    const newAccessToken = generateAccessToken(admin);
    const newRefreshToken = generateRefreshToken(admin);

    admin.refreshToken = newRefreshToken;
    await admin.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw new ApiError(
      'Refresh token expired or invalid. Please log in again.',
      401,
      RES_CODE.AUTH_UNAUTHORIZED,
    );
  }
};

export const logoutService = async (adminId) => {
  await Admin.findByIdAndUpdate(adminId, { $unset: { refreshToken: 1 } });
  return { success: true };
};

/**
 * @desc    Nghiệp vụ Yêu cầu cấp mã OTP khôi phục mật khẩu
 */
export const forgotPasswordService = async (email) => {
  if (!email) {
    throw new ApiError(
      'Please provide an email address.',
      400,
      RES_CODE.VALIDATION_ERROR,
    );
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(
      'No admin found with that email address.',
      404,
      RES_CODE.AUTH_NOT_FOUND,
    );
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  admin.resetOtp = otp;
  admin.resetOtpExpire = Date.now() + 5 * 60 * 1000;
  await admin.save();

  try {
    const message = `Your password reset OTP is: ${otp}. This code is valid for 5 minutes.`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #d9534f; text-align: center;">Password Reset Request</h2>
        <p>Hello <strong>Administrator</strong>,</p>
        <p>You recently requested to reset your password for the Restaurant Admin Dashboard. Here is your One-Time Password (OTP):</p>
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px;">
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #333;">${options.otp}</span>
        </div>
        <p style="color: #777; font-size: 14px;"><em>* This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.</em></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #aaa; text-align: center;">If you did not request a password reset, please ignore this email or secure your account immediately.</p>
      </div>
    `;
    const options = {
      email: admin.email,
      subject: '[Restaurant Dashboard] - Password Reset OTP',
      message: message,
      html: emailHtml,
    };

    sendEmail(options).catch((err) => {
      console.error('Background Email Sending Error:', err.message);
    });

    return {
      success: true,
      message: 'Password reset OTP has been sent to your email.',
    };
  } catch (error) {
    admin.resetOtp = undefined;
    admin.resetOtpExpire = undefined;
    await admin.save({ validateBeforeSave: false });

    console.error('Nodemailer Error:', error);
    throw new ApiError(
      'Could not send email at this time. Please try again later or check SMTP settings.',
      500,
      RES_CODE.EMAIL_SEND_ERROR,
    );
  }
};

/**
 * @desc    Nghiệp vụ Đặt lại mật khẩu mới bằng mã OTP
 */
export const resetPasswordService = async (email, otp, newPassword) => {
  if (!email || !otp || !newPassword) {
    throw new ApiError(
      'Please provide email, OTP, and new password.',
      400,
      RES_CODE.VALIDATION_ERROR,
    );
  }

  const admin = await Admin.findOne({
    email: email,
    resetOtp: otp,
    resetOtpExpire: { $gt: Date.now() },
  });

  if (!admin) {
    throw new ApiError(
      'Invalid or expired OTP.',
      400,
      RES_CODE.VALIDATION_ERROR,
    );
  }

  admin.password = newPassword;

  admin.resetOtp = undefined;
  admin.resetOtpExpire = undefined;

  await admin.save();

  return {
    message:
      'Password reset successfully. You can now log in with your new password.',
  };
};
