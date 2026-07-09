const express = require("express");

const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// ==========================
// TASK ROUTES
// ==========================

// Get All Tasks
router.get("/", getTasks);

// Create New Task
router.post("/", createTask);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;