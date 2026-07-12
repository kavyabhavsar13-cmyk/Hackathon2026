import { z } from 'zod';
import { objectId } from '#validators/common.validator';

export const createFuelLogSchema = z
  .object({
    vehicle: objectId,
    trip: objectId.optional(),
    liters: z.number().positive('Liters must be greater than 0'),
    cost: z.number().min(0).optional(),
    costPerLiter: z.number().positive().optional(),
    fuelDate: z.coerce.date().optional(),
  })
  .refine((data) => data.cost !== undefined || data.costPerLiter !== undefined, {
    message: 'Either cost or costPerLiter is required',
    path: ['cost'],
  });

export const updateFuelLogSchema = z.object({
  trip: objectId.optional(),
  liters: z.number().positive().optional(),
  cost: z.number().min(0).optional(),
  costPerLiter: z.number().positive().optional(),
  fuelDate: z.coerce.date().optional(),
});
