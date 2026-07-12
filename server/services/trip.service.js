import { HTTP_STATUS } from '#constants/httpStatus';
import { VEHICLE_STATUS, DRIVER_STATUS, TRIP_STATUS } from '#constants/status';
import { ApiError } from '#utils/ApiError';
import { Trip } from '#models/Trip.model';
import {
  assertVehicleDispatchable,
  assertCargoWithinCapacity,
  getVehicleById,
} from '#services/vehicle.service';
import { assertDriverAssignable, getDriverById } from '#services/driver.service';

const CORE_FIELDS = ['source', 'destination', 'cargoWeight', 'plannedDistance'];

async function findTripOrThrow(id) {
  const trip = await Trip.findById(id);
  if (!trip) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Trip not found');
  }
  return trip;
}

function assertMutableFields(trip, fields) {
  if (trip.status === TRIP_STATUS.DRAFT) return;

  const touchesCoreField = CORE_FIELDS.some((field) => fields[field] !== undefined);
  if (touchesCoreField) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Cannot modify source, destination, cargo weight, or planned distance once a trip is no longer a draft',
    );
  }
}

async function dispatchTrip(trip, rest) {
  if (trip.status !== TRIP_STATUS.DRAFT) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Only draft trips can be dispatched');
  }

  const vehicle = await assertVehicleDispatchable(trip.vehicle);
  assertCargoWithinCapacity(vehicle, rest.cargoWeight ?? trip.cargoWeight);
  const driver = await assertDriverAssignable(trip.driver);

  Object.assign(trip, rest);
  trip.status = TRIP_STATUS.DISPATCHED;
  await trip.save();

  vehicle.status = VEHICLE_STATUS.ON_TRIP;
  await vehicle.save();
  driver.status = DRIVER_STATUS.ON_TRIP;
  await driver.save();
}

async function completeTrip(trip, rest) {
  if (trip.status !== TRIP_STATUS.DISPATCHED) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Only dispatched trips can be completed');
  }

  Object.assign(trip, rest);
  trip.status = TRIP_STATUS.COMPLETED;
  await trip.save();

  const vehicle = await getVehicleById(trip.vehicle);
  vehicle.status = VEHICLE_STATUS.AVAILABLE;
  await vehicle.save();

  const driver = await getDriverById(trip.driver);
  driver.status = DRIVER_STATUS.AVAILABLE;
  await driver.save();
}

async function cancelTrip(trip, rest) {
  if (trip.status === TRIP_STATUS.COMPLETED || trip.status === TRIP_STATUS.CANCELLED) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, `Trip is already ${trip.status.toLowerCase()} and cannot be cancelled`);
  }

  const wasDispatched = trip.status === TRIP_STATUS.DISPATCHED;

  Object.assign(trip, rest);
  trip.status = TRIP_STATUS.CANCELLED;
  await trip.save();

  if (wasDispatched) {
    const vehicle = await getVehicleById(trip.vehicle);
    vehicle.status = VEHICLE_STATUS.AVAILABLE;
    await vehicle.save();

    const driver = await getDriverById(trip.driver);
    driver.status = DRIVER_STATUS.AVAILABLE;
    await driver.save();
  }
}

export async function listTrips(filters = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.vehicle) query.vehicle = filters.vehicle;
  if (filters.driver) query.driver = filters.driver;

  return Trip.find(query).sort({ createdAt: -1 }).populate('vehicle').populate('driver');
}

export async function getTripById(id) {
  const trip = await Trip.findById(id).populate('vehicle').populate('driver');
  if (!trip) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Trip not found');
  }
  return trip;
}

export async function createTrip(data) {
  const { vehicle: vehicleId, driver: driverId, cargoWeight } = data;

  const vehicle = await assertVehicleDispatchable(vehicleId);
  assertCargoWithinCapacity(vehicle, cargoWeight);
  const driver = await assertDriverAssignable(driverId);

  const trip = await Trip.create({ ...data, status: TRIP_STATUS.DISPATCHED });

  vehicle.status = VEHICLE_STATUS.ON_TRIP;
  await vehicle.save();
  driver.status = DRIVER_STATUS.ON_TRIP;
  await driver.save();

  return trip.populate(['vehicle', 'driver']);
}

export async function updateTrip(id, data) {
  const trip = await findTripOrThrow(id);
  const { status: nextStatus, ...rest } = data;

  if (nextStatus && nextStatus !== trip.status) {
    if (nextStatus === TRIP_STATUS.DISPATCHED) {
      await dispatchTrip(trip, rest);
    } else if (nextStatus === TRIP_STATUS.COMPLETED) {
      await completeTrip(trip, rest);
    } else if (nextStatus === TRIP_STATUS.CANCELLED) {
      await cancelTrip(trip, rest);
    } else {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, `Invalid status transition to "${nextStatus}"`);
    }
  } else {
    assertMutableFields(trip, rest);
    Object.assign(trip, rest);
    await trip.save();
  }

  return trip.populate(['vehicle', 'driver']);
}

export async function deleteTrip(id) {
  const trip = await findTripOrThrow(id);

  if (trip.status === TRIP_STATUS.DISPATCHED) {
    const vehicle = await getVehicleById(trip.vehicle);
    vehicle.status = VEHICLE_STATUS.AVAILABLE;
    await vehicle.save();

    const driver = await getDriverById(trip.driver);
    driver.status = DRIVER_STATUS.AVAILABLE;
    await driver.save();
  }

  await trip.deleteOne();
  return trip;
}
