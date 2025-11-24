const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  name: String,
  mobile: String,

  rightEye: {
    sph: String,
    cyl: String,
    axis: String,
    vn: String,
  },

  leftEye: {
    sph: String,
    cyl: String,
    axis: String,
    vn: String,
  },

  frame: String,
  lens: String,
  repairing: String,

  image: String, // file name

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", BillSchema);
