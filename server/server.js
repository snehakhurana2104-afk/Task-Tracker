import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

// ===========================================
// Load Environment Variables
// ===========================================

dotenv.config();
console.log(process.env.MONGO_URI);

// ===========================================
// Connect MongoDB Database
// ===========================================

connectDB();

// ===========================================
// Initialize Express App
// ===========================================

const app = express();

// ===========================================
// Middlewares
// ===========================================

// Enable CORS
app.use(cors());

// Parse JSON Data
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// ===========================================
// API Routes
// ===========================================

// Task Routes
app.use("/api/tasks", taskRoutes);

// Team Routes
app.use("/api/team", teamRoutes);

// ===========================================
// Default Route
// ===========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Task Tracker Backend API 🚀",
  });
});

// ===========================================
// Health Check Route
// ===========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
  });
});

// ===========================================
// Handle Invalid Routes
// ===========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===========================================
// MongoDB Connection Events
// ===========================================

mongoose.connection.on("connected", () => {
  console.log("=================================");
  console.log("✅ MongoDB Connected Successfully");
  console.log(`📦 Database : ${mongoose.connection.name}`);
  console.log(`🌐 Host      : ${mongoose.connection.host}`);
  console.log("=================================");
});

mongoose.connection.on("error", (err) => {
  console.log("=================================");
  console.log("❌ MongoDB Connection Error");
  console.log(err.message);
  console.log("=================================");
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠ MongoDB Disconnected");
});

// ===========================================
// Start Express Server
// ===========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Task Tracker Backend Started");
  console.log(`🌍 Server : http://localhost:${PORT}`);
  console.log(`📌 Port   : ${PORT}`);
  console.log("=================================");
});