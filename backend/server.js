const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const billRoutes = require("./routes/billRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// For image access
app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Optical Billing Server Running!");
});

app.use("/bills", billRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
