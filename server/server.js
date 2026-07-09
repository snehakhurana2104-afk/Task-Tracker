require('dotenv').config(); // Loads MONGO_URI from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const teamRoutes = require("./routes/teamRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend Server is Online!");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/team", teamRoutes);

// Database Connection
// Database Connection
// REMOVE: const dbUri = process.env.MONGO_URI; 
// USE THIS INSTEAD:
const dbUri = process.env.MONGO_URI;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });