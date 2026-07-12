import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import * as reportService from '#services/report.service';

function parseFilters(query) {
  return {
    vehicleId: query.vehicleId,
    startDate: query.startDate,
    endDate: query.endDate,
  };
}

export const getFuelEfficiencyReport = asyncHandler(async (req, res) => {
  const report = await reportService.getFuelEfficiencyReport(parseFilters(req.query));
  sendSuccess(res, { message: 'Fuel efficiency report generated successfully', data: report });
});

export const getFleetUtilizationReport = asyncHandler(async (req, res) => {
  const report = await reportService.getFleetUtilizationReport(parseFilters(req.query));
  sendSuccess(res, { message: 'Fleet utilization report generated successfully', data: report });
});

export const getOperationalCostReport = asyncHandler(async (req, res) => {
  const report = await reportService.getOperationalCostReport(parseFilters(req.query));
  sendSuccess(res, { message: 'Operational cost report generated successfully', data: report });
});

export const getVehicleROIReport = asyncHandler(async (req, res) => {
  const report = await reportService.getVehicleROIReport(parseFilters(req.query));
  sendSuccess(res, { message: 'Vehicle ROI report generated successfully', data: report });
});
