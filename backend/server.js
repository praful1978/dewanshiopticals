// backend/app.js or server.js
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Multer setup for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage });

// Bill schema
import mongoose from "mongoose";
const billSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  rightEye: Object,
  leftEye: Object,
  frame: String,
  lens: String,
  repairing: String,
  image: String, // store filename
});

const Bill = mongoose.model("Bill", billSchema);

// API route
app.post("/api/bills", upload.single("image"), async (req, res) => {
  try {
    const bill = new Bill({
      name: req.body.name,
      mobile: req.body.mobile,
      rightEye: {
        sph: req.body["rightEye[sph]"],
        cyl: req.body["rightEye[cyl]"],
        axis: req.body["rightEye[axis]"],
        vn: req.body["rightEye[vn]"],
      },
      leftEye: {
        sph: req.body["leftEye[sph]"],
        cyl: req.body["leftEye[cyl]"],
        axis: req.body["leftEye[axis]"],
        vn: req.body["leftEye[vn]"],
      },
      frame: req.body.frame,
      lens: req.body.lens,
      repairing: req.body.repairing,
      image: req.file ? req.file.filename : null,
    });

    await bill.save();
    res.json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving bill" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
