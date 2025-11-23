
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/billdb')
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

const BillSchema = new mongoose.Schema({
  customerName:String,
  amount:Number,
  date:String
});
const Bill = mongoose.model("Bill", BillSchema);

app.post("/api/bill", async(req,res)=>{
  const bill = await Bill.create(req.body);
  res.json(bill);
});

app.get("/api/bill", async(req,res)=>{
  const bills = await Bill.find();
  res.json(bills);
});

app.listen(5000, ()=>console.log("Backend running on 5000"));
