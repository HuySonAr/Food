/**
 * Chuẩn hóa API Response
 * @param {number} code - -1 (fail) | 0 (success) | 1, 2, 3 (additional)
 * @param {string} msg - Message thông báo (success, fail, hoặc custom)
 * @param {any} data - Dữ liệu trả về (mặc định là object rỗng)
 */
export const formatResponse = (code, msg, data = {}) => {
  return { code, msg, data };
};
