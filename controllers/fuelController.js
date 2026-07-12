const FuelLog = require("../models/FuelLog");
const Vehicle = require("../models/Vehicle");
const Trip = require("../models/Trip");

const createFuelLog = async (req, res) => {
  try {
    const { vehicle, trip, liters, cost, fuelDate } = req.body;

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

    const fuelLog = await FuelLog.create({
      vehicle,
      trip,
      liters,
      cost,
      fuelDate,
    });

    res.status(201).json({
      success: true,
      message: "Fuel log created successfully",
      data: fuelLog,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllFuelLogs = async (req, res) => {

  try {

    const fuelLogs = await FuelLog.find()
      .populate("vehicle")
      .populate("trip");

    res.status(200).json({
      success: true,
      count: fuelLogs.length,
      data: fuelLogs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getFuelLogById = async (req, res) => {

  try {

    const fuelLog = await FuelLog.findById(req.params.id)
      .populate("vehicle")
      .populate("trip");

    if (!fuelLog) {
      return res.status(404).json({
        success: false,
        message: "Fuel log not found",
      });
    }

    res.status(200).json({
      success: true,
      data: fuelLog,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const updateFuelLog = async (req, res) => {

  try {

    const fuelLog = await FuelLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!fuelLog) {
      return res.status(404).json({
        success: false,
        message: "Fuel log not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fuel log updated successfully",
      data: fuelLog,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const deleteFuelLog = async (req, res) => {

  try {

    const fuelLog = await FuelLog.findByIdAndDelete(req.params.id);

    if (!fuelLog) {
      return res.status(404).json({
        success: false,
        message: "Fuel log not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fuel log deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createFuelLog,
  getAllFuelLogs,
  getFuelLogById,
  updateFuelLog,
  deleteFuelLog,
};