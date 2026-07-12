const express = require("express");

const router = express.Router();

const {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController");

// Create Driver
router.post("/", createDriver);

// Get All Drivers
router.get("/", getAllDrivers);

// Get Driver By ID
router.get("/:id", getDriverById);

// Update Driver
router.put("/:id", updateDriver);

// Delete Driver
router.delete("/:id", deleteDriver);

module.exports = router;