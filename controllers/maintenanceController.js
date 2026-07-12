const Maintenance = require("../models/Maintenance");
const Vehicle = require("../models/Vehicle");

// Create Maintenance Record
const createMaintenance = async (req, res) => {
  try {
    const {
      vehicle,
      maintenanceType,
      description,
      cost
    } = req.body;

    const selectedVehicle = await Vehicle.findById(vehicle);

    if (!selectedVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (selectedVehicle.status === "Retired") {
      return res.status(400).json({
        success: false,
        message: "Retired vehicle cannot be maintained",
      });
    }

    if (selectedVehicle.status === "On Trip") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is currently on a trip",
      });
    }

    if (selectedVehicle.status === "In Shop") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is already in maintenance",
      });
    }

    const maintenance = await Maintenance.create({
      vehicle,
      maintenanceType,
      description,
      cost,
    });

    selectedVehicle.status = "In Shop";

    await selectedVehicle.save();

    res.status(201).json({
      success: true,
      message: "Maintenance created successfully",
      data: maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllMaintenance = async (req, res) => {

  try {

    const maintenance = await Maintenance.find()
      .populate("vehicle");

    res.status(200).json({
      success: true,
      count: maintenance.length,
      data: maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getMaintenanceById = async (req, res) => {

  try {

    const maintenance = await Maintenance.findById(req.params.id)
      .populate("vehicle");

    if (!maintenance) {

      return res.status(404).json({
        success: false,
        message: "Maintenance record not found",
      });

    }

    res.status(200).json({
      success: true,
      data: maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const completeMaintenance = async (req, res) => {

  try {

    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {

      return res.status(404).json({
        success: false,
        message: "Maintenance record not found",
      });

    }

    const vehicle = await Vehicle.findById(maintenance.vehicle);

    maintenance.status = "Completed";
    maintenance.endDate = new Date();

    if (vehicle.status !== "Retired") {
      vehicle.status = "Available";
    }

    await maintenance.save();
    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Maintenance completed successfully",
      data: maintenance,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const deleteMaintenance = async (req, res) => {

  try {

    const maintenance = await Maintenance.findByIdAndDelete(req.params.id);

    if (!maintenance) {

      return res.status(404).json({
        success: false,
        message: "Maintenance record not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Maintenance deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  completeMaintenance,
  deleteMaintenance,
};