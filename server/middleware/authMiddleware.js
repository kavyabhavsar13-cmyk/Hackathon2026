import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '#constants/httpStatus';
import { ApiError } from '#utils/ApiError';
import { asyncHandler } from '#utils/asyncHandler';
import { User } from '#models/User.model';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized, no token provided');
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Session expired, please log in again');
    }
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
  }

  const user = await User.findById(decoded.id);

  if (!user || !user.isActive) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized, user no longer exists or is inactive');
  }

  req.user = user;
  next();
});
