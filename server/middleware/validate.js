import { HTTP_STATUS } from '#constants/httpStatus';
import { ApiError } from '#utils/ApiError';

export function validate(schema) {
  return function validateRequest(req, res, next) {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.length ? issue.path.join('.') : 'body',
        message: issue.message,
      }));

      return next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Validation failed', errors));
    }

    req.body = result.data;
    next();
  };
}
