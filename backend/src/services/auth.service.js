import crypto from 'crypto';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new ApiError('Please provide email and password.', 400);
  }

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.matchPassword(password))) {
    throw new ApiError('Invalid email or password.', 401);
  }

  return {
    _id: admin._id,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id),
  };
};

/**
 * @desc    Nghiệp vụ Yêu cầu cấp mã OTP khôi phục mật khẩu
 */
export const forgotPaswordService = async (email) => {
  if (!email) {
    throw new ApiError('Please provide an email address.', 400);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError('No admin found with that email address.', 404);
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  admin.resetOtp = otp;
  admin.resetOtpExpire = Date.now() + 5 * 60 * 1000;
  await admin.save();

  try {
    const message = `Mã OTP khôi phục mật khẩu của bạn là: ${otp}. Mã này có hiệu lực trong vòng 5 phút.`;
    const options = {
      email: admin.email,
      subject: '[Restaurant Dashboard] - Mã OTP Khôi Phục Mật Khẩu',
      message: message,
      otp: otp,
    };

    await sendEmail(options);

    return {
      success: true,
      message: 'Mã OTP khôi phục mật khẩu đã được gửi đến email của bạn.',
    };
  } catch (error) {
    admin.resetOtp = undefined;
    admin.resetOtpExpire = undefined;
    await admin.save({ validateBeforeSave: false });

    console.error('Nodemailer Error:', error);
    throw new ApiError(
      'Không thể gửi email lúc này. Vui lòng thử lại sau hoặc kiểm tra cấu hình SMTP.',
      500,
    );
  }
};

/**
 * @desc    Nghiệp vụ Đặt lại mật khẩu mới bằng mã OTP
 */
export const resetPasswordService = async (email, otp, newPassword) => {
  if (!email || !otp || !newPassword) {
    throw new ApiError('Please provide email, OTP, and new password.', 400);
  }

  const admin = await Admin.findOne({
    email: email,
    resetOtp: otp,
    resetOtpExpire: { $gt: Date.now() },
  });

  if (!admin) {
    throw new ApiError('Invalid or expired OTP.', 400);
  }

  admin.password = newPassword;

  admin.resetOtp = undefined;
  admin.resetOtpExpire = undefined;

  await admin.save();

  return {
    message: 'Password reset successfully. You can now log in with your new password.',
  };
};

