const mongoose = require("mongoose");

const gatePassSchema = new mongoose.Schema({
  gpNo: String,
  date: { type: Date, default: Date.now },
  time: String,

  companyName: {
    type: String,
    default: "AADHI CARS PVT LTD"
  },

  rmName: String,
  customerName: String,
  customerContact: String,
  vehicleNo: String,
  purpose: String,
  place: String,

  type: {
    type: String,
    enum: ["IN", "OUT"],
    default: "OUT"
  },

  createdBy: String
});

module.exports = mongoose.model("GatePass", gatePassSchema);
createdBy: String