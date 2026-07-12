const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");

/*
==========================================
CREATE TRIP
==========================================
*/

const createTrip = async (req, res) => {

    try {

        const {
            source,
            destination,
            vehicle,
            driver,
            cargoWeight,
            plannedDistance,
            revenue
        } = req.body;

        // Check vehicle exists
        const selectedVehicle = await Vehicle.findById(vehicle);

        if (!selectedVehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        // Vehicle should be Available
        if (selectedVehicle.status !== "Available") {
            return res.status(400).json({
                success: false,
                message: "Vehicle is not available."
            });
        }

        // Check driver exists
        const selectedDriver = await Driver.findById(driver);

        if (!selectedDriver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }

        // Driver must be available
        if (selectedDriver.status !== "Available") {
            return res.status(400).json({
                success: false,
                message: "Driver is not available."
            });
        }

        // License expiry validation
        if (new Date(selectedDriver.licenseExpiryDate) < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Driver license has expired."
            });
        }

        // Cargo validation
        if (cargoWeight > selectedVehicle.maxLoadCapacity) {

            return res.status(400).json({
                success: false,
                message: "Cargo exceeds vehicle capacity."
            });

        }

        // Create Trip

        const trip = await Trip.create({

            source,
            destination,
            vehicle,
            driver,
            cargoWeight,
            plannedDistance,
            revenue

        });

        res.status(201).json({

            success: true,
            message: "Trip created successfully.",
            data: trip

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/*
==========================================
DISPATCH TRIP
==========================================
*/

const dispatchTrip = async (req, res) => {

    try {

        const trip = await Trip.findById(req.params.id);

        if (!trip) {

            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });

        }

        const vehicle = await Vehicle.findById(trip.vehicle);

        const driver = await Driver.findById(trip.driver);

        vehicle.status = "On Trip";
        driver.status = "On Trip";

        trip.status = "Dispatched";

        await vehicle.save();

        await driver.save();

        await trip.save();

        res.json({

            success: true,
            message: "Trip dispatched successfully.",
            data: trip

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/*
==========================================
COMPLETE TRIP
==========================================
*/

const completeTrip = async (req, res) => {

    try {

        const {

            finalDistance,
            fuelConsumed

        } = req.body;

        const trip = await Trip.findById(req.params.id);

        if (!trip) {

            return res.status(404).json({

                success: false,
                message: "Trip not found"

            });

        }

        const vehicle = await Vehicle.findById(trip.vehicle);

        const driver = await Driver.findById(trip.driver);

        trip.status = "Completed";

        trip.finalDistance = finalDistance;

        trip.fuelConsumed = fuelConsumed;

        vehicle.status = "Available";

        vehicle.odometer += finalDistance;

        driver.status = "Available";

        await vehicle.save();

        await driver.save();

        await trip.save();

        res.json({

            success: true,
            message: "Trip completed successfully.",
            data: trip

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const cancelTrip = async (req, res) => {

    try {

        const trip = await Trip.findById(req.params.id);

        if (!trip) {

            return res.status(404).json({

                success: false,
                message: "Trip not found"

            });

        }

        const vehicle = await Vehicle.findById(trip.vehicle);

        const driver = await Driver.findById(trip.driver);

        trip.status = "Cancelled";

        vehicle.status = "Available";

        driver.status = "Available";

        await vehicle.save();

        await driver.save();

        await trip.save();

        res.json({

            success: true,
            message: "Trip cancelled successfully."
        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const getAllTrips = async (req, res) => {

    try {

        const trips = await Trip.find()
            .populate("vehicle")
            .populate("driver");

        res.json({

            success: true,
            count: trips.length,
            data: trips

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    createTrip,

    dispatchTrip,

    completeTrip,

    cancelTrip,

    getAllTrips

};