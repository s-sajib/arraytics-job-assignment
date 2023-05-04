const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create Express.js server
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB database
console.log(`Connecting to MongoDB database at ${process.env.MONGODB_URI}`);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB database:", err.message);
  });

// Define API endpoints
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
