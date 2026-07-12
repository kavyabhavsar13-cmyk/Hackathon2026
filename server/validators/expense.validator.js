import { z } from 'zod';
import { EXPENSE_CATEGORIES } from '#constants/expenseCategories';
import { objectId } from '#validators/common.validator';

export const createExpenseSchema = z.object({
  vehicle: objectId,
  trip: objectId.optional(),
  category: z.enum(EXPENSE_CATEGORIES, {
    message: `Category must be one of: ${EXPENSE_CATEGORIES.join(', ')}`,
  }),
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string().trim().optional(),
  expenseDate: z.coerce.date().optional(),
});

export const updateExpenseSchema = z.object({
  trip: objectId.optional(),
  category: z.enum(EXPENSE_CATEGORIES).optional(),
  amount: z.number().positive().optional(),
  description: z.string().trim().optional(),
  expenseDate: z.coerce.date().optional(),
});
