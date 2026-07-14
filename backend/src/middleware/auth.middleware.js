import { RES_CODE } from '../constants/responseCode.constant.js';
import Admin from '../models/Admin.js';
import { formatResponse } from '../utils/response.util.js';
import { verifyAccessToken } from '../utils/verifyToken.js';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyAccessToken(token);
      req.admin = await Admin.findById(decoded.id).select(
        '-password -refreshToken -resetOtp -resetOtpExpire',
      );

      if (!req.admin) {
        return res
          .status(401)
          .json(
            formatResponse(
              RES_CODE.AUTH_NOT_FOUND,
              'This account no longer exists or has been locked.',
            ),
          );
      }
      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res
        .status(401)
        .json(
          formatResponse(
            RES_CODE.AUTH_UNAUTHORIZED,
            'Invalid or expired access token.',
          ),
        );
    }
  }

  if (!token) {
    return res
      .status(401)
      .json(
        formatResponse(
          RES_CODE.AUTH_UNAUTHORIZED,
          'Access denied. No token provided.',
        ),
      );
  }
};

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.admin || !allowedRoles.includes(req.admin.role)) {
      return res
        .status(403)
        .json(
          formatResponse(
            RES_CODE.AUTH_UNAUTHORIZED,
            'You do not have permission to perform this action.',
          ),
        );
    }
    next();
  };
};
