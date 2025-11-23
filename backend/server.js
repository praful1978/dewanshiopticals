const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db"); // keep your db.js path

connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Ensure the route file name matches exactly:
app.use("/api/bills", require("./routes/billRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
