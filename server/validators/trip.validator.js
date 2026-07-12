import { z } from 'zod';
import { TRIP_STATUS_VALUES } from '#constants/status';
import { objectId } from '#validators/common.validator';

export const createTripSchema = z.object({
  source: z.string().trim().min(1, 'Source is required'),
  destination: z.string().trim().min(1, 'Destination is required'),
  vehicle: objectId,
  driver: objectId,
  cargoWeight: z.number().positive('Cargo weight must be greater than 0'),
  plannedDistance: z.number().positive('Planned distance must be greater than 0'),
  revenue: z.number().min(0).optional(),
});

export const updateTripSchema = z.object({
  source: z.string().trim().min(1).optional(),
  destination: z.string().trim().min(1).optional(),
  cargoWeight: z.number().positive().optional(),
  plannedDistance: z.number().positive().optional(),
  finalDistance: z.number().min(0).optional(),
  fuelConsumed: z.number().min(0).optional(),
  revenue: z.number().min(0).optional(),
  status: z.enum(TRIP_STATUS_VALUES).optional(),
});
