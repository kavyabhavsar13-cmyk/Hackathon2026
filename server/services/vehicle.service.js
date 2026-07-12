import { HTTP_STATUS } from '#constants/httpStatus';
import { VEHICLE_STATUS } from '#constants/status';
import { ApiError } from '#utils/ApiError';
import { Vehicle } from '#models/Vehicle.model';

const LOCKED_STATUSES = [VEHICLE_STATUS.ON_TRIP, VEHICLE_STATUS.IN_SHOP];

export async function listVehicles(filters = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.type) query.type = filters.type;
  if (filters.region) query.region = filters.region;

  return Vehicle.find(query).sort({ createdAt: -1 });
}

export async function getVehicleById(id) {
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Vehicle not found');
  }
  return vehicle;
}

export async function createVehicle(data) {
  return Vehicle.create(data);
}

export async function updateVehicle(id, data) {
  const vehicle = await getVehicleById(id);

  if (data.status && LOCKED_STATUSES.includes(data.status) && data.status !== vehicle.status) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Vehicle status "${data.status}" is managed automatically by trip dispatch/maintenance workflows and cannot be set directly`,
    );
  }

  Object.assign(vehicle, data);
  await vehicle.save();
  return vehicle;
}

export async function deleteVehicle(id) {
  const vehicle = await getVehicleById(id);

  if (LOCKED_STATUSES.includes(vehicle.status)) {
    throw new ApiError(HTTP_STATUS.CONFLICT, `Cannot delete a vehicle that is currently "${vehicle.status}"`);
  }

  await vehicle.deleteOne();
  return vehicle;
}

export async function assertVehicleDispatchable(vehicleId) {
  const vehicle = await getVehicleById(vehicleId);

  if (vehicle.status === VEHICLE_STATUS.RETIRED) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Retired vehicles cannot be dispatched');
  }
  if (vehicle.status === VEHICLE_STATUS.IN_SHOP) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Vehicle is under maintenance and cannot be dispatched');
  }
  if (vehicle.status === VEHICLE_STATUS.ON_TRIP) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Vehicle is already on a trip');
  }

  return vehicle;
}

export function assertCargoWithinCapacity(vehicle, cargoWeight) {
  if (cargoWeight > vehicle.maxLoadCapacity) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Cargo weight (${cargoWeight}) exceeds vehicle capacity (${vehicle.maxLoadCapacity})`,
    );
  }
}
