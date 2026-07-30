import { z } from 'zod';

export const loginRequestDto = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format')
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters'),
});

export const forgotPasswordRequestDto = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format.')
    .trim()
    .toLowerCase(),
});

export const resetPasswordRequestDto = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format.')
    .trim()
    .toLowerCase(),
  otp: z
    .string({ required_error: 'OTP is required.' })
    .length(6, 'OTP must be exactly 6 digits.')
    .regex(/^\d+$/, 'OTP must contain only numbers.'),
  newPassword: z
    .string({ required_error: 'New password is required.' })
    .min(8, 'New password must be at least 8 characters long.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
    ),
});

/**
 * @desc Response DTO cho Thông tin tài khoản
 */
export class AdminResponseDto {
  constructor(admin, accessToken = null) {
    this.id = admin._id || admin.id;
    this.email = admin.email;
    this.role = admin.role;

    if (accessToken) {
      this.accessToken = accessToken;
    }
  }
}
