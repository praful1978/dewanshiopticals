// const mongoose = require("mongoose");

// const BillSchema = new mongoose.Schema({
//   name: String,
//   mobile: String,

//   rightEye: {
//     sph: String,
//     cyl: String,
//     axis: String,
//     vn: String,
//   },

//   leftEye: {
//     sph: String,
//     cyl: String,
//     axis: String,
//     vn: String,
//   },

//   frame: String,
//   lens: String,
//   repairing: String,

//   image: String, // file name

//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Bill", BillSchema);
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await connectToDatabase();
      const db = client.db("billdb"); // MongoDB DB name
      const bill = req.body;
      const result = await db.collection("bills").insertOne(bill);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ error: "Error saving bill", details: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
