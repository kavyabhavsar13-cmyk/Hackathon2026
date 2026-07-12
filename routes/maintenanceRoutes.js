const express = require("express");

const router = express.Router();

const {
  createMaintenance,
  getAllMaintenance,
  getMaintenanceById,
  completeMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");

router.post("/", createMaintenance);

router.get("/", getAllMaintenance);

router.get("/:id", getMaintenanceById);

router.put("/:id/complete", completeMaintenance);

router.delete("/:id", deleteMaintenance);

module.exports = router;