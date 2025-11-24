// server.js (or app.js)

const express = require('express');
const connectDB = require("./config/db"); 
const cors = require("cors");
// 1. FIX: UNCOMMENT THIS LINE if you are running locally and relying on a .env file
// Remember to install: npm install dotenv
// require("dotenv").config(); 


// --- Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
// Calling this function here ensures the DB connection starts right away
connectDB(); 


// --- Middleware ---
// 2. Middleware must be applied to the 'app' instance
app.use(cors()); 
app.use(express.json());


// --- Routes ---
// Ensure the path "./routes/bills" is correct relative to this file's location
const billsRouter = require("./routes/billRoutes"); 
app.use("/api/bills", billsRouter);

// Root route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});