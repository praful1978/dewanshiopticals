const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo Error: " + err));


// ===== BILL SCHEMA =====
const BillSchema = new mongoose.Schema({
  customerName: String,
  amount: Number,
  date: String
});

const Bill = mongoose.model("Bill", BillSchema);

// ===== ROUTES =====

// Test
app.get("/", (req, res) => {
  res.send("Server Working!");
});

// Create bill
app.post("/api/bills", async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get bills
app.get("/api/bills", async (req, res) => {
  const bills = await Bill.find();
  res.json(bills);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on " + PORT));
