const express = require("express");

const router = express.Router();

const {
  createFuelLog,
  getAllFuelLogs,
  getFuelLogById,
  updateFuelLog,
  deleteFuelLog,
} = require("../controllers/fuelController");

router.post("/", createFuelLog);

router.get("/", getAllFuelLogs);

router.get("/:id", getFuelLogById);

router.put("/:id", updateFuelLog);

router.delete("/:id", deleteFuelLog);

module.exports = router;