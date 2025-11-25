// // api/bills.js
// import express from "express";
// import mongoose from "mongoose";

// // ✔ Create express app
// const app = express();
// app.use(express.json());

// // ✔ MongoDB connection (only once)
// let isConnected = false;

// async function connectDB() {
//   if (isConnected) return;
//   await mongoose.connect(process.env.MONGO_URI);
//   isConnected = true;
//   console.log("MongoDB connected");
// }

// // ✔ Your schema
// const billSchema = new mongoose.Schema({
//   name: String,
//   mobile: String,
//   rightEye: Object,
//   leftEye: Object,
// });

// const Bill = mongoose.models.Bill || mongoose.model("Bill", billSchema);

// // ✔ ROUTE
// app.post("/api/bills", async (req, res) => {
//   try {
//     await connectDB();
//     const bill = await Bill.create(req.body);
//     res.status(200).json({ success: true, bill });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error saving bill" });
//   }
// });

// // ✔ IMPORTANT: Export handler for Vercel
// export default function handler(req, res) {
//   app(req, res); // forward request to Express
// }

import mongoose from "mongoose";
import Bill from "../models/Bill.js";

const MONGO_URI = process.env.MONGO_URI;

export default async function handler(req, res) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(MONGO_URI);
    }

    if (req.method === "POST") {
      const bill = new Bill(req.body);
      await bill.save();
      return res.status(200).json({ success: true, bill });
    }

    return res.status(400).json({ error: "Invalid method" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error saving bill" });
  }
}
