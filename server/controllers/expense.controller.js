import { HTTP_STATUS } from '#constants/httpStatus';
import { asyncHandler } from '#utils/asyncHandler';
import { sendSuccess } from '#utils/apiResponse';
import * as expenseService from '#services/expense.service';

export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await expenseService.listExpenses(req.query);
  sendSuccess(res, { message: 'Expenses fetched successfully', data: { expenses } });
});

export const getExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.getExpenseById(req.params.id);
  sendSuccess(res, { message: 'Expense fetched successfully', data: { expense } });
});

export const createExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.createExpense(req.body);
  sendSuccess(res, { statusCode: HTTP_STATUS.CREATED, message: 'Expense created successfully', data: { expense } });
});

export const updateExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.updateExpense(req.params.id, req.body);
  sendSuccess(res, { message: 'Expense updated successfully', data: { expense } });
});

export const deleteExpense = asyncHandler(async (req, res) => {
  await expenseService.deleteExpense(req.params.id);
  sendSuccess(res, { message: 'Expense deleted successfully' });
});
