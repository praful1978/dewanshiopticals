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

// Test route
app.get("/", (req, res) => {
  res.send("Server Working!");
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on " + PORT));
