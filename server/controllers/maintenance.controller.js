import { HTTP_STATUS } from '#constants/httpStatus';
import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import * as maintenanceService from '#services/maintenance.service';

export const getMaintenanceRecords = asyncHandler(async (req, res) => {
  const maintenanceRecords = await maintenanceService.listMaintenance(req.query);
  sendSuccess(res, { message: 'Maintenance records fetched successfully', data: { maintenanceRecords } });
});

export const getMaintenanceRecord = asyncHandler(async (req, res) => {
  const maintenance = await maintenanceService.getMaintenanceById(req.params.id);
  sendSuccess(res, { message: 'Maintenance record fetched successfully', data: { maintenance } });
});

export const createMaintenanceRecord = asyncHandler(async (req, res) => {
  const maintenance = await maintenanceService.openMaintenance(req.body);
  sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: 'Maintenance opened successfully',
    data: { maintenance },
  });
});

export const updateMaintenanceRecord = asyncHandler(async (req, res) => {
  const maintenance = await maintenanceService.updateMaintenance(req.params.id, req.body);
  sendSuccess(res, { message: 'Maintenance record updated successfully', data: { maintenance } });
});

export const deleteMaintenanceRecord = asyncHandler(async (req, res) => {
  await maintenanceService.deleteMaintenance(req.params.id);
  sendSuccess(res, { message: 'Maintenance record deleted successfully' });
});
