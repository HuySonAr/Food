import Admin from '../models/Admin.js';
import verifyToken from '../utils/verifyToken.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      
      req.admin = await Admin.findById(decoded.id).select(
        '-password -resetOtp -resetOtpExpire',
      );
      
      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: 'This account no longer exists or has been locked.',
        });
      }
      
      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }
};