import mongoose from 'mongoose';
import { TRIP_STATUS } from '#constants/status';
import { Vehicle } from '#models/Vehicle.model';
import { Trip } from '#models/Trip.model';
import { Maintenance } from '#models/Maintenance.model';
import { FuelLog } from '#models/FuelLog.model';
import { Expense } from '#models/Expense.model';

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function toObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

function buildDateRange(startDate, endDate) {
  const range = {};
  if (startDate) range.$gte = new Date(startDate);
  if (endDate) range.$lte = new Date(endDate);
  return Object.keys(range).length ? range : undefined;
}

async function sumByVehicle(Model, dateField, amountField, { vehicleId, startDate, endDate } = {}) {
  const match = {};
  if (vehicleId) match.vehicle = toObjectId(vehicleId);
  const dateRange = buildDateRange(startDate, endDate);
  if (dateRange) match[dateField] = dateRange;

  const rows = await Model.aggregate([
    { $match: match },
    { $group: { _id: '$vehicle', total: { $sum: `$${amountField}` } } },
  ]);

  return new Map(rows.map((row) => [String(row._id), row.total]));
}

async function computeCostBreakdown(filters) {
  const [maintenanceMap, fuelMap, expenseMap] = await Promise.all([
    sumByVehicle(Maintenance, 'startDate', 'cost', filters),
    sumByVehicle(FuelLog, 'fuelDate', 'cost', filters),
    sumByVehicle(Expense, 'expenseDate', 'amount', filters),
  ]);

  const vehicleIds = new Set([...maintenanceMap.keys(), ...fuelMap.keys(), ...expenseMap.keys()]);
  const breakdown = new Map();

  for (const id of vehicleIds) {
    const maintenanceCost = maintenanceMap.get(id) || 0;
    const fuelCost = fuelMap.get(id) || 0;
    const expenseCost = expenseMap.get(id) || 0;
    breakdown.set(id, {
      maintenanceCost: round2(maintenanceCost),
      fuelCost: round2(fuelCost),
      expenseCost: round2(expenseCost),
      totalCost: round2(maintenanceCost + fuelCost + expenseCost),
    });
  }

  return breakdown;
}

async function sumRevenueByVehicle({ vehicleId, startDate, endDate } = {}) {
  const match = { status: TRIP_STATUS.COMPLETED };
  if (vehicleId) match.vehicle = toObjectId(vehicleId);
  const dateRange = buildDateRange(startDate, endDate);
  if (dateRange) match.updatedAt = dateRange;

  const rows = await Trip.aggregate([
    { $match: match },
    { $group: { _id: '$vehicle', totalRevenue: { $sum: '$revenue' } } },
  ]);

  return new Map(rows.map((row) => [String(row._id), row.totalRevenue]));
}

export async function getFuelEfficiencyReport(filters = {}) {
  const { vehicleId, startDate, endDate } = filters;
  const match = {
    status: TRIP_STATUS.COMPLETED,
    finalDistance: { $gt: 0 },
    fuelConsumed: { $gt: 0 },
  };
  if (vehicleId) match.vehicle = toObjectId(vehicleId);
  const dateRange = buildDateRange(startDate, endDate);
  if (dateRange) match.updatedAt = dateRange;

  const rows = await Trip.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$vehicle',
        totalDistance: { $sum: '$finalDistance' },
        totalFuel: { $sum: '$fuelConsumed' },
        tripCount: { $sum: 1 },
      },
    },
    { $lookup: { from: 'vehicles', localField: '_id', foreignField: '_id', as: 'vehicle' } },
    { $unwind: '$vehicle' },
    {
      $project: {
        _id: 0,
        vehicleId: '$_id',
        registrationNumber: '$vehicle.registrationNumber',
        vehicleName: '$vehicle.vehicleName',
        totalDistance: 1,
        totalFuel: 1,
        tripCount: 1,
        kmPerLiter: { $cond: [{ $gt: ['$totalFuel', 0] }, { $divide: ['$totalDistance', '$totalFuel'] }, 0] },
      },
    },
    { $sort: { kmPerLiter: -1 } },
  ]);

  const vehicles = rows.map((row) => ({ ...row, kmPerLiter: round2(row.kmPerLiter) }));
  const totalDistance = rows.reduce((sum, row) => sum + row.totalDistance, 0);
  const totalFuel = rows.reduce((sum, row) => sum + row.totalFuel, 0);

  return {
    vehicles,
    fleetAverageKmPerLiter: totalFuel > 0 ? round2(totalDistance / totalFuel) : 0,
  };
}

export async function getFleetUtilizationReport(filters = {}) {
  const { vehicleId, startDate, endDate } = filters;

  const vehicleMatch = vehicleId ? { _id: toObjectId(vehicleId) } : {};
  const [statusCounts, totalVehicles] = await Promise.all([
    Vehicle.aggregate([{ $match: vehicleMatch }, { $group: { _id: '$status', count: { $sum: 1 } } }]),
    Vehicle.countDocuments(vehicleMatch),
  ]);

  const statusBreakdown = Object.fromEntries(statusCounts.map((row) => [row._id, row.count]));
  const vehiclesOnTrip = statusBreakdown['On Trip'] || 0;

  const tripMatch = {};
  if (vehicleId) tripMatch.vehicle = toObjectId(vehicleId);
  const dateRange = buildDateRange(startDate, endDate);
  if (dateRange) tripMatch.createdAt = dateRange;

  const perVehicle = await Trip.aggregate([
    { $match: tripMatch },
    {
      $group: {
        _id: '$vehicle',
        tripCount: { $sum: 1 },
        totalDistance: { $sum: { $ifNull: ['$finalDistance', '$plannedDistance'] } },
      },
    },
    { $lookup: { from: 'vehicles', localField: '_id', foreignField: '_id', as: 'vehicle' } },
    { $unwind: '$vehicle' },
    {
      $project: {
        _id: 0,
        vehicleId: '$_id',
        registrationNumber: '$vehicle.registrationNumber',
        vehicleName: '$vehicle.vehicleName',
        tripCount: 1,
        totalDistance: 1,
      },
    },
    { $sort: { tripCount: -1 } },
  ]);

  return {
    totalVehicles,
    statusBreakdown,
    currentUtilizationRate: totalVehicles > 0 ? round2((vehiclesOnTrip / totalVehicles) * 100) : 0,
    perVehicle,
  };
}

export async function getOperationalCostReport(filters = {}) {
  const costBreakdown = await computeCostBreakdown(filters);
  const vehicleQuery = filters.vehicleId ? { _id: filters.vehicleId } : {};
  const vehicles = await Vehicle.find(vehicleQuery);

  const report = vehicles
    .map((vehicle) => {
      const cost = costBreakdown.get(String(vehicle._id)) || {
        maintenanceCost: 0,
        fuelCost: 0,
        expenseCost: 0,
        totalCost: 0,
      };
      return {
        vehicleId: vehicle._id,
        registrationNumber: vehicle.registrationNumber,
        vehicleName: vehicle.vehicleName,
        ...cost,
      };
    })
    .sort((a, b) => b.totalCost - a.totalCost);

  return {
    vehicles: report,
    fleetTotalCost: round2(report.reduce((sum, row) => sum + row.totalCost, 0)),
  };
}

export async function getVehicleROIReport(filters = {}) {
  const [costBreakdown, revenueByVehicle] = await Promise.all([
    computeCostBreakdown(filters),
    sumRevenueByVehicle(filters),
  ]);

  const vehicleQuery = filters.vehicleId ? { _id: filters.vehicleId } : {};
  const vehicles = await Vehicle.find(vehicleQuery);

  const report = vehicles
    .map((vehicle) => {
      const id = String(vehicle._id);
      const cost = costBreakdown.get(id) || { totalCost: 0 };
      const totalRevenue = round2(revenueByVehicle.get(id) || 0);
      const netProfit = round2(totalRevenue - cost.totalCost);
      const roiPercentage = vehicle.acquisitionCost > 0 ? round2((netProfit / vehicle.acquisitionCost) * 100) : 0;

      return {
        vehicleId: vehicle._id,
        registrationNumber: vehicle.registrationNumber,
        vehicleName: vehicle.vehicleName,
        acquisitionCost: vehicle.acquisitionCost,
        totalRevenue,
        totalOperationalCost: cost.totalCost,
        netProfit,
        roiPercentage,
      };
    })
    .sort((a, b) => b.roiPercentage - a.roiPercentage);

  return { vehicles: report };
}
