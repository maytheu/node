const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: { type: Number, required: true, unique: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String, required: true },
  customers: [String],
  upcoming: { type: Boolean, default: true, required: true },
  success: { type: Boolean, default: true, required: true },
  launchDate: { type: Date, required: true },
});

const launchesModel = mongoose.model("Launch", launchesSchema);

module.exports = launchesModel;
