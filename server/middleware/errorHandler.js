import { HTTP_STATUS } from '#constants/httpStatus';
import { sendError } from '#utils/apiResponse';

function normalizeError(err) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return {
      statusCode: HTTP_STATUS.CONFLICT,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already in use`,
      errors: [],
    };
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    return { statusCode: HTTP_STATUS.BAD_REQUEST, message: 'Validation failed', errors };
  }

  if (err.name === 'CastError') {
    return { statusCode: HTTP_STATUS.BAD_REQUEST, message: `Invalid ${err.path}`, errors: [] };
  }

  if (err.name === 'JsonWebTokenError') {
    return { statusCode: HTTP_STATUS.UNAUTHORIZED, message: 'Invalid token', errors: [] };
  }

  if (err.name === 'TokenExpiredError') {
    return { statusCode: HTTP_STATUS.UNAUTHORIZED, message: 'Session expired, please log in again', errors: [] };
  }

  return {
    statusCode: err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
    errors: err.errors || [],
  };
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  const { statusCode, message, errors } = normalizeError(err);

  sendError(res, { statusCode, message, errors });
}
