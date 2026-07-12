import { HTTP_STATUS } from '#constants/httpStatus';
import { sendError } from '#utils/apiResponse';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong';

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  sendError(res, {
    statusCode,
    message,
    errors: err.errors || [],
  });
}
