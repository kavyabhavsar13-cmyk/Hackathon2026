import { HTTP_STATUS } from '#constants/httpStatus';
import { ApiError } from '#utils/ApiError';

export function roleMiddleware(...allowedRoles) {
  return function authorizeRole(req, res, next) {
    if (!req.user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Not authorized');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not have permission to perform this action');
    }

    next();
  };
}
