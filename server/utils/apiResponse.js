import { HTTP_STATUS } from '#constants/httpStatus';

export function sendSuccess(res, { statusCode = HTTP_STATUS.OK, message = 'Success', data = null } = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res, { statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message = 'Something went wrong', errors = [] } = {}) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}
