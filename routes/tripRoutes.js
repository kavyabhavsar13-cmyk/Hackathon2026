const express = require("express");

const router = express.Router();

const {

    createTrip,
    dispatchTrip,
    completeTrip,
    cancelTrip,
    getAllTrips

} = require("../controllers/tripController");

router.post("/", createTrip);

router.get("/", getAllTrips);

router.put("/:id/dispatch", dispatchTrip);

router.put("/:id/complete", completeTrip);

router.put("/:id/cancel", cancelTrip);

module.exports = router;