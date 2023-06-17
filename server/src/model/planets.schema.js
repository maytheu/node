const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  kepler_name: { type: String, },
});

const planetModel = mongoose.model("Planet", planetsSchema);

module.exports = planetModel;
