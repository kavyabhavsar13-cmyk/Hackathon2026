import { HTTP_STATUS } from '#constants/httpStatus';
import { DRIVER_STATUS } from '#constants/status';
import { ApiError } from '#utils/ApiError';
import { Driver } from '#models/Driver.model';

export async function listDrivers(filters = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;

  return Driver.find(query).sort({ createdAt: -1 });
}

export async function getDriverById(id) {
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Driver not found');
  }
  return driver;
}

export async function createDriver(data) {
  return Driver.create(data);
}

export async function updateDriver(id, data) {
  const driver = await getDriverById(id);

  if (data.status === DRIVER_STATUS.ON_TRIP && driver.status !== DRIVER_STATUS.ON_TRIP) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      'Driver status "On Trip" is managed automatically by trip dispatch and cannot be set directly',
    );
  }

  Object.assign(driver, data);
  await driver.save();
  return driver;
}

export async function deleteDriver(id) {
  const driver = await getDriverById(id);

  if (driver.status === DRIVER_STATUS.ON_TRIP) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Cannot delete a driver who is currently on a trip');
  }

  await driver.deleteOne();
  return driver;
}

export async function assertDriverAssignable(driverId) {
  const driver = await getDriverById(driverId);

  if (driver.status === DRIVER_STATUS.SUSPENDED) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Suspended drivers cannot be assigned to a trip');
  }
  if (driver.status === DRIVER_STATUS.ON_TRIP) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Driver is already assigned to a trip');
  }
  if (driver.status === DRIVER_STATUS.OFF_DUTY) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Driver is off duty and cannot be assigned to a trip');
  }
  if (driver.licenseExpiryDate && driver.licenseExpiryDate.getTime() < Date.now()) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Driver's license has expired and cannot be assigned to a trip");
  }

  return driver;
}
