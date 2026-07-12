import { HTTP_STATUS } from '#constants/httpStatus';
import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import * as vehicleService from '#services/vehicle.service';

export const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await vehicleService.listVehicles(req.query);
  sendSuccess(res, { message: 'Vehicles fetched successfully', data: { vehicles } });
});

export const getVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.getVehicleById(req.params.id);
  sendSuccess(res, { message: 'Vehicle fetched successfully', data: { vehicle } });
});

export const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);
  sendSuccess(res, { statusCode: HTTP_STATUS.CREATED, message: 'Vehicle created successfully', data: { vehicle } });
});

export const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
  sendSuccess(res, { message: 'Vehicle updated successfully', data: { vehicle } });
});

export const deleteVehicle = asyncHandler(async (req, res) => {
  await vehicleService.deleteVehicle(req.params.id);
  sendSuccess(res, { message: 'Vehicle deleted successfully' });
});
