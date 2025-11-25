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


import { createBill } from "../routes/billRoutes.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const saved = await createBill(req.body);
      return res.status(200).json({ success: true, data: saved });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error saving bill" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
