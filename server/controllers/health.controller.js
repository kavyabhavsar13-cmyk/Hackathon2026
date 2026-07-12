import { sendSuccess } from '#utils/apiResponse';

export function getHealth(req, res) {
  sendSuccess(res, {
    message: 'Service is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
}
