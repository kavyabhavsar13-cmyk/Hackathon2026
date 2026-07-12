export const VEHICLE_STATUS = {
  AVAILABLE: 'Available',
  ON_TRIP: 'On Trip',
  IN_SHOP: 'In Shop',
  RETIRED: 'Retired',
};
export const VEHICLE_STATUS_VALUES = Object.values(VEHICLE_STATUS);

export const DRIVER_STATUS = {
  AVAILABLE: 'Available',
  ON_TRIP: 'On Trip',
  OFF_DUTY: 'Off Duty',
  SUSPENDED: 'Suspended',
};
export const DRIVER_STATUS_VALUES = Object.values(DRIVER_STATUS);

export const TRIP_STATUS = {
  DRAFT: 'Draft',
  DISPATCHED: 'Dispatched',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};
export const TRIP_STATUS_VALUES = Object.values(TRIP_STATUS);

export const MAINTENANCE_STATUS = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};
export const MAINTENANCE_STATUS_VALUES = Object.values(MAINTENANCE_STATUS);
