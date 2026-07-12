import { Router } from 'express';
import { authMiddleware } from '#middleware/authMiddleware';
import { validate } from '#middleware/validate';
import { createExpenseSchema, updateExpenseSchema } from '#validators/expense.validator';
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from '#controllers/expense.controller';

const router = Router();

router.use(authMiddleware);

router.get('/', getExpenses);
router.get('/:id', getExpense);
router.post('/', validate(createExpenseSchema), createExpense);
router.patch('/:id', validate(updateExpenseSchema), updateExpense);
router.delete('/:id', deleteExpense);

export default router;
