const Expense = require("../models/Expense");
const Vehicle = require("../models/Vehicle");
const Trip = require("../models/Trip");

const createExpense = async (req, res) => {
  try {
    const {
      vehicle,
      trip,
      expenseType,
      amount,
      description,
      expenseDate,
    } = req.body;

    const selectedVehicle = await Vehicle.findById(vehicle);

    if (!selectedVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (trip) {
      const selectedTrip = await Trip.findById(trip);

      if (!selectedTrip) {
        return res.status(404).json({
          success: false,
          message: "Trip not found",
        });
      }
    }

    const expense = await Expense.create({
      vehicle,
      trip,
      expenseType,
      amount,
      description,
      expenseDate,
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllExpenses = async (req, res) => {
  try {

    const expenses = await Expense.find()
      .populate("vehicle")
      .populate("trip");

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getExpenseById = async (req, res) => {

  try {

    const expense = await Expense.findById(req.params.id)
      .populate("vehicle")
      .populate("trip");

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateExpense = async (req, res) => {

  try {

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteExpense = async (req, res) => {

  try {

    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
