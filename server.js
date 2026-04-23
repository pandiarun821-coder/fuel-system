const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// DB
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const fuelRoutes = require("./routes/fuelRoutes");
const gatepassRoutes = require("./routes/gatepassRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/gatepass", gatepassRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Fuel System Backend Running 🚀");
});

// DB connect
connectDB();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});