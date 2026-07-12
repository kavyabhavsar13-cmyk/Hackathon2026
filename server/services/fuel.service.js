import { HTTP_STATUS } from '#constants/httpStatus';
import { ApiError } from '#utils/ApiError';
import { FuelLog } from '#models/FuelLog.model';
import { Trip } from '#models/Trip.model';
import { getVehicleById } from '#services/vehicle.service';

function round2(value) {
  return Math.round(value * 100) / 100;
}

function resolveCost(liters, cost, costPerLiter) {
  if (cost !== undefined) return round2(cost);
  return round2(liters * costPerLiter);
}

async function assertTripExists(tripId) {
  const trip = await Trip.findById(tripId);
  if (!trip) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Trip not found');
  }
}

async function findFuelLogOrThrow(id) {
  const fuelLog = await FuelLog.findById(id);
  if (!fuelLog) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Fuel log not found');
  }
  return fuelLog;
}

export async function listFuelLogs(filters = {}) {
  const query = {};
  if (filters.vehicle) query.vehicle = filters.vehicle;
  if (filters.trip) query.trip = filters.trip;

  return FuelLog.find(query).sort({ fuelDate: -1 }).populate('vehicle').populate('trip');
}

export async function getFuelLogById(id) {
  const fuelLog = await FuelLog.findById(id).populate('vehicle').populate('trip');
  if (!fuelLog) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Fuel log not found');
  }
  return fuelLog;
}

export async function createFuelLog(data) {
  const { costPerLiter, ...payload } = data;

  await getVehicleById(payload.vehicle);
  if (payload.trip) {
    await assertTripExists(payload.trip);
  }

  payload.cost = resolveCost(payload.liters, payload.cost, costPerLiter);

  const fuelLog = await FuelLog.create(payload);
  return fuelLog.populate(['vehicle', 'trip']);
}

export async function updateFuelLog(id, data) {
  const fuelLog = await findFuelLogOrThrow(id);
  const { costPerLiter, ...rest } = data;

  if (rest.trip) {
    await assertTripExists(rest.trip);
  }

  if (rest.cost !== undefined || costPerLiter !== undefined || rest.liters !== undefined) {
    const liters = rest.liters ?? fuelLog.liters;
    rest.cost = resolveCost(liters, rest.cost, costPerLiter);
  }

  Object.assign(fuelLog, rest);
  await fuelLog.save();
  return fuelLog.populate(['vehicle', 'trip']);
}

export async function deleteFuelLog(id) {
  const fuelLog = await findFuelLogOrThrow(id);
  await fuelLog.deleteOne();
  return fuelLog;
}
