import express from "express";
import billsHandler from "./api/bills.js";

const app = express();
app.use(express.json());

// Route
app.post("/api/bills", billsHandler);

// Optional: test GET
app.get("/api/health", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
