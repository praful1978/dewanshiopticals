const express = require("express");
const connectDB = require("./config/db"); 
const cors = require("cors");
// Note: We need to load environment variables here if you use them in connectDB
// require("dotenv").config(); 


const app = express(); // ⬅️ 'app' is initialized here
const PORT = process.env.PORT || 5000;

// Middleware (All app.use() calls go here, after 'app' is defined)
app.use(cors()); // ⬅️ The fix: Now app.use() is called after 'app' is defined
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

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