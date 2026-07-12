import { z } from 'zod';
import { DRIVER_STATUS_VALUES } from '#constants/status';

export const createDriverSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  licenseNumber: z.string().trim().min(1, 'License number is required'),
  licenseCategory: z.string().trim().min(1, 'License category is required'),
  licenseExpiryDate: z.coerce.date({ message: 'A valid license expiry date is required' }),
  contactNumber: z.string().trim().min(1, 'Contact number is required'),
  safetyScore: z.number().min(0).max(100).optional(),
});

export const updateDriverSchema = z.object({
  name: z.string().trim().min(1).optional(),
  licenseNumber: z.string().trim().min(1).optional(),
  licenseCategory: z.string().trim().min(1).optional(),
  licenseExpiryDate: z.coerce.date().optional(),
  contactNumber: z.string().trim().min(1).optional(),
  safetyScore: z.number().min(0).max(100).optional(),
  status: z.enum(DRIVER_STATUS_VALUES).optional(),
});
