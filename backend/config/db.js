const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/billdb");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
};

module.exports = connectDB;
