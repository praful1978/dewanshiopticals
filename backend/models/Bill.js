const mongoose = require("mongoose");

const EyeSchema = new mongoose.Schema({
  sph: String,
  cyl: String,
  axis: String,
  vn: String
}, { _id: false });

const BillSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  rightEye: EyeSchema,
  leftEye: EyeSchema,
  frame: String,
  lens: String,
  repairing: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", BillSchema);
