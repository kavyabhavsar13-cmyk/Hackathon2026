import { HTTP_STATUS } from '#constants/httpStatus';
import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import * as fuelService from '#services/fuel.service';

export const getFuelLogs = asyncHandler(async (req, res) => {
  const fuelLogs = await fuelService.listFuelLogs(req.query);
  sendSuccess(res, { message: 'Fuel logs fetched successfully', data: { fuelLogs } });
});

export const getFuelLog = asyncHandler(async (req, res) => {
  const fuelLog = await fuelService.getFuelLogById(req.params.id);
  sendSuccess(res, { message: 'Fuel log fetched successfully', data: { fuelLog } });
});

export const createFuelLog = asyncHandler(async (req, res) => {
  const fuelLog = await fuelService.createFuelLog(req.body);
  sendSuccess(res, { statusCode: HTTP_STATUS.CREATED, message: 'Fuel log created successfully', data: { fuelLog } });
});

export const updateFuelLog = asyncHandler(async (req, res) => {
  const fuelLog = await fuelService.updateFuelLog(req.params.id, req.body);
  sendSuccess(res, { message: 'Fuel log updated successfully', data: { fuelLog } });
});

export const deleteFuelLog = asyncHandler(async (req, res) => {
  await fuelService.deleteFuelLog(req.params.id);
  sendSuccess(res, { message: 'Fuel log deleted successfully' });
});
