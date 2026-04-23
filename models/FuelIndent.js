const mongoose = require("mongoose");

const fuelIndentSchema = new mongoose.Schema({
  fiNo: String,
  date: { type: Date, default: Date.now },
  time: String,

  companyName: {
    type: String,
    default: "AADHI CARS PVT LTD"
  },

  vehicleNo: String,
  model: String,
  km: String,
  dseTl: String,
  fuelType: String,
  createdBy: String
});

module.exports = mongoose.model("FuelIndent", fuelIndentSchema);