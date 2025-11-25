// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Bill = require("../models/Bill");

// // 🔹 File Upload Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });

// const upload = multer({ storage });

// // 🔹 Save Bill
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const bill = new Bill({
//       ...req.body,
//       image: req.file ? req.file.filename : null,
//       rightEye: {
//         sph: req.body["rightEye[sph]"],
//         cyl: req.body["rightEye[cyl]"],
//         axis: req.body["rightEye[axis]"],
//         vn: req.body["rightEye[vn]"],
//       },
//       leftEye: {
//         sph: req.body["leftEye[sph]"],
//         cyl: req.body["leftEye[cyl]"],
//         axis: req.body["leftEye[axis]"],
//         vn: req.body["leftEye[vn]"],
//       }
//     });

//     const saved = await bill.save();
//     res.json(saved);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🔹 Get All Bills
// router.get("/", async (req, res) => {
//   const bills = await Bill.find();
//   res.json(bills);
// });

// module.exports = router;
import Bill from "../models/Bill.js";
import { connectDB } from "../api/db.js";

export async function createBill(req) {
  await connectDB();
  const bill = await Bill.create(req);
  return bill;
}
