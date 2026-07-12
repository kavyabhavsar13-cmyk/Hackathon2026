import { z } from 'zod';
import { VEHICLE_STATUS_VALUES } from '#constants/status';

export const createVehicleSchema = z.object({
  registrationNumber: z.string().trim().min(1, 'Registration number is required'),
  vehicleName: z.string().trim().min(1, 'Vehicle name is required'),
  type: z.string().trim().min(1, 'Vehicle type is required'),
  maxLoadCapacity: z.number().positive('Max load capacity must be greater than 0'),
  odometer: z.number().min(0).optional(),
  acquisitionCost: z.number().min(0, 'Acquisition cost cannot be negative'),
  region: z.string().trim().optional(),
});

export const updateVehicleSchema = z.object({
  registrationNumber: z.string().trim().min(1).optional(),
  vehicleName: z.string().trim().min(1).optional(),
  type: z.string().trim().min(1).optional(),
  maxLoadCapacity: z.number().positive().optional(),
  odometer: z.number().min(0).optional(),
  acquisitionCost: z.number().min(0).optional(),
  region: z.string().trim().optional(),
  status: z.enum(VEHICLE_STATUS_VALUES).optional(),
});
