const mongoose = require("mongoose");

const fuelLogSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      default: null,
    },

    liters: {
      type: Number,
      required: true,
      min: 0,
    },

    cost: {
      type: Number,
      required: true,
      min: 0,
    },

    fuelDate: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FuelLog", fuelLogSchema);