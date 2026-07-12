import { HTTP_STATUS } from '#constants/httpStatus';
import { sendError } from '#utils/apiResponse';

export function notFound(req, res) {
  sendError(res, {
    statusCode: HTTP_STATUS.NOT_FOUND,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
