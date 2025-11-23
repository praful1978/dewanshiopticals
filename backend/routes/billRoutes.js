// billRoutes.js

const express = require("express");
const router = express.Router(); 
const multer = require("multer");
const path = require("path");
const Bill = require("../models/Bill");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");

// Multer storage
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// POST create bill - Handles file upload and data saving
router.post("/", upload.single("billImage"), async (req, res) => {
  try {
    const body = req.body || {};

    // ⭐️ FIX: Build rightEye and leftEye objects ONLY from the new flattened keys
    const rightEye = {
      sph: body.rightEye_sph ?? "",
      cyl: body.rightEye_cyl ?? "",
      axis: body.rightEye_axis ?? "",
      vn:  body.rightEye_vn  ?? ""
    };

    const leftEye = {
      sph: body.leftEye_sph ?? "",
      cyl: body.leftEye_cyl ?? "",
      axis: body.leftEye_axis ?? "",
      vn:  body.leftEye_vn  ?? ""
    };

    const bill = new Bill({
      name: body.name ?? "",
      mobile: body.mobile ?? "",
      rightEye, // Correctly reconstructed object
      leftEye,  // Correctly reconstructed object
      frame: body.frame ?? "",
      lens: body.lens ?? "",
      repairing: body.repairing ?? "",
      imageUrl: req.file ? req.file.filename : null 
    });

    await bill.save();
    res.json({ success: true, bill });
  } catch (err) {
    console.error("Error saving bill:", err);
    // Return a detailed 500 status response to help with future debugging
    res.status(500).json({ success: false, message: "Server error saving bill", error: err.message });
  }
});

// GET list (unchanged)
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 }).limit(200);
    res.json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;