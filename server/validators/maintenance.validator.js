import { z } from 'zod';
import { MAINTENANCE_STATUS_VALUES } from '#constants/status';
import { objectId } from '#validators/common.validator';

export const createMaintenanceSchema = z.object({
  vehicle: objectId,
  maintenanceType: z.string().trim().min(1, 'Maintenance type is required'),
  description: z.string().trim().optional(),
  cost: z.number().min(0).optional(),
  startDate: z.coerce.date().optional(),
});

export const updateMaintenanceSchema = z.object({
  maintenanceType: z.string().trim().min(1).optional(),
  description: z.string().trim().optional(),
  cost: z.number().min(0).optional(),
  status: z.enum(MAINTENANCE_STATUS_VALUES).optional(),
  endDate: z.coerce.date().optional(),
});
