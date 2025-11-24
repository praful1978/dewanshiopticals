const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

const BillSchema = new mongoose.Schema({
  customerName: String,
  amount: Number,
  date: String
});
const Bill = mongoose.model("Bill", BillSchema);

app.post("/api/bills", async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/bills", async (req, res) => {
  const bills = await Bill.find();
  res.json(bills);
});

// IMPORTANT FIX:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on " + PORT));
