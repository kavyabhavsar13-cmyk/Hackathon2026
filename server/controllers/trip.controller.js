import { HTTP_STATUS } from '#constants/httpStatus';
import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import * as tripService from '#services/trip.service';

export const getTrips = asyncHandler(async (req, res) => {
  const trips = await tripService.listTrips(req.query);
  sendSuccess(res, { message: 'Trips fetched successfully', data: { trips } });
});

export const getTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.getTripById(req.params.id);
  sendSuccess(res, { message: 'Trip fetched successfully', data: { trip } });
});

export const createTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.createTrip(req.body);
  sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: 'Trip dispatched successfully',
    data: { trip },
  });
});

export const updateTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.updateTrip(req.params.id, req.body);
  sendSuccess(res, { message: 'Trip updated successfully', data: { trip } });
});

export const deleteTrip = asyncHandler(async (req, res) => {
  await tripService.deleteTrip(req.params.id);
  sendSuccess(res, { message: 'Trip deleted successfully' });
});
