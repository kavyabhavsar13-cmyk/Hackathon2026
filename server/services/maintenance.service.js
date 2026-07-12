import { HTTP_STATUS } from '#constants/httpStatus';
import { VEHICLE_STATUS, MAINTENANCE_STATUS } from '#constants/status';
import { ApiError } from '#utils/ApiError';
import { Maintenance } from '#models/Maintenance.model';
import { getVehicleById } from '#services/vehicle.service';

async function findMaintenanceOrThrow(id) {
  const maintenance = await Maintenance.findById(id);
  if (!maintenance) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Maintenance record not found');
  }
  return maintenance;
}

async function closeMaintenance(maintenance, rest) {
  Object.assign(maintenance, rest);
  maintenance.status = MAINTENANCE_STATUS.COMPLETED;
  maintenance.endDate = rest.endDate || new Date();
  await maintenance.save();

  const vehicle = await getVehicleById(maintenance.vehicle);
  if (vehicle.status === VEHICLE_STATUS.IN_SHOP) {
    vehicle.status = VEHICLE_STATUS.AVAILABLE;
    await vehicle.save();
  }

  return maintenance;
}

export async function listMaintenance(filters = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.vehicle) query.vehicle = filters.vehicle;

  return Maintenance.find(query).sort({ createdAt: -1 }).populate('vehicle');
}

export async function getMaintenanceById(id) {
  const maintenance = await Maintenance.findById(id).populate('vehicle');
  if (!maintenance) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Maintenance record not found');
  }
  return maintenance;
}

export async function openMaintenance(data) {
  const vehicle = await getVehicleById(data.vehicle);

  if (vehicle.status === VEHICLE_STATUS.ON_TRIP) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Cannot start maintenance while the vehicle is on a trip');
  }
  if (vehicle.status === VEHICLE_STATUS.IN_SHOP) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Vehicle is already under maintenance');
  }
  if (vehicle.status === VEHICLE_STATUS.RETIRED) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Cannot schedule maintenance for a retired vehicle');
  }

  const maintenance = await Maintenance.create({ ...data, status: MAINTENANCE_STATUS.ACTIVE });

  vehicle.status = VEHICLE_STATUS.IN_SHOP;
  await vehicle.save();

  return maintenance.populate('vehicle');
}

export async function updateMaintenance(id, data) {
  const maintenance = await findMaintenanceOrThrow(id);

  if (maintenance.status === MAINTENANCE_STATUS.COMPLETED) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Cannot modify a completed maintenance record');
  }

  if (data.status === MAINTENANCE_STATUS.COMPLETED) {
    const { status, ...rest } = data;
    await closeMaintenance(maintenance, rest);
  } else {
    Object.assign(maintenance, data);
    await maintenance.save();
  }

  return maintenance.populate('vehicle');
}

export async function deleteMaintenance(id) {
  const maintenance = await findMaintenanceOrThrow(id);

  if (maintenance.status === MAINTENANCE_STATUS.ACTIVE) {
    const vehicle = await getVehicleById(maintenance.vehicle);
    if (vehicle.status === VEHICLE_STATUS.IN_SHOP) {
      vehicle.status = VEHICLE_STATUS.AVAILABLE;
      await vehicle.save();
    }
  }

  await maintenance.deleteOne();
  return maintenance;
}
