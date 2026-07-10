export const RES_CODE = Object.freeze({
  SUCCESS: 0,
  FAIL: -1,

  // Auth Errors (1x)
  AUTH_INVALID_CREDENTIALS: 10, // Sai email/mật khẩu
  AUTH_UNAUTHORIZED: 11, // Không có token hoặc token không hợp lệ/hết hạn
  AUTH_NOT_FOUND: 12, // Không tìm thấy user

  // Reservation Errors (2x)
  RES_CONFLICT: 20, // Trùng lịch đặt bàn
  RES_NOT_FOUND: 21, // Không tìm thấy đơn đặt bàn
  RES_INVALID_STATE: 22, // Trạng thái không hợp lệ (vd: update completed)

  // System/Validation Errors (3x)
  VALIDATION_ERROR: 30, // Dữ liệu đầu vào sai (Zod)
  EMAIL_SEND_ERROR: 31, // Lỗi gửi email SMTP
});
