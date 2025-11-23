const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
app.use(cors()); // Add this line


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const billsRouter = require("./routes/bills");
app.use("/api/bills", billsRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
