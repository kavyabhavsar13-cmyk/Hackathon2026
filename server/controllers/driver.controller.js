import { HTTP_STATUS } from '#constants/httpStatus';
import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import * as driverService from '#services/driver.service';

export const getDrivers = asyncHandler(async (req, res) => {
  const drivers = await driverService.listDrivers(req.query);
  sendSuccess(res, { message: 'Drivers fetched successfully', data: { drivers } });
});

export const getDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.getDriverById(req.params.id);
  sendSuccess(res, { message: 'Driver fetched successfully', data: { driver } });
});

export const createDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.createDriver(req.body);
  sendSuccess(res, { statusCode: HTTP_STATUS.CREATED, message: 'Driver created successfully', data: { driver } });
});

export const updateDriver = asyncHandler(async (req, res) => {
  const driver = await driverService.updateDriver(req.params.id, req.body);
  sendSuccess(res, { message: 'Driver updated successfully', data: { driver } });
});

export const deleteDriver = asyncHandler(async (req, res) => {
  await driverService.deleteDriver(req.params.id);
  sendSuccess(res, { message: 'Driver deleted successfully' });
});
