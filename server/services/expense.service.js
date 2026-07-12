import { HTTP_STATUS } from '#constants/httpStatus';
import { ApiError } from '#utils/ApiError';
import { Expense } from '#models/Expense.model';
import { Trip } from '#models/Trip.model';
import { getVehicleById } from '#services/vehicle.service';

async function assertTripExists(tripId) {
  const trip = await Trip.findById(tripId);
  if (!trip) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Trip not found');
  }
}

async function findExpenseOrThrow(id) {
  const expense = await Expense.findById(id);
  if (!expense) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Expense not found');
  }
  return expense;
}

export async function listExpenses(filters = {}) {
  const query = {};
  if (filters.vehicle) query.vehicle = filters.vehicle;
  if (filters.trip) query.trip = filters.trip;
  if (filters.category) query.category = filters.category;

  return Expense.find(query).sort({ expenseDate: -1 }).populate('vehicle').populate('trip');
}

export async function getExpenseById(id) {
  const expense = await Expense.findById(id).populate('vehicle').populate('trip');
  if (!expense) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Expense not found');
  }
  return expense;
}

export async function createExpense(data) {
  await getVehicleById(data.vehicle);
  if (data.trip) {
    await assertTripExists(data.trip);
  }

  const expense = await Expense.create(data);
  return expense.populate(['vehicle', 'trip']);
}

export async function updateExpense(id, data) {
  const expense = await findExpenseOrThrow(id);

  if (data.trip) {
    await assertTripExists(data.trip);
  }

  Object.assign(expense, data);
  await expense.save();
  return expense.populate(['vehicle', 'trip']);
}

export async function deleteExpense(id) {
  const expense = await findExpenseOrThrow(id);
  await expense.deleteOne();
  return expense;
}
