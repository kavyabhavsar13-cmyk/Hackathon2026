const express = require("express");

const router = express.Router();

const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

// Create Vehicle
router.post("/", createVehicle);

// Get All Vehicles
router.get("/", getAllVehicles);

// Get Vehicle By ID
router.get("/:id", getVehicleById);

// Update Vehicle
router.put("/:id", updateVehicle);

// Delete Vehicle
router.delete("/:id", deleteVehicle);

module.exports = router;