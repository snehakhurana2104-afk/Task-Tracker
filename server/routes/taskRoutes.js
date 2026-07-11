import express from "express";

import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

// ===========================================
// Initialize Router
// ===========================================

const router = express.Router();

// ===========================================
// Task Routes
// ===========================================

// Get All Tasks
// GET : /api/tasks
router.get("/", getAllTasks);

// Get Single Task
// GET : /api/tasks/:id
router.get("/:id", getTaskById);

// Create New Task
// POST : /api/tasks
router.post("/", createTask);

// Update Task
// PUT : /api/tasks/:id
router.put("/:id", updateTask);

// Delete Task
// DELETE : /api/tasks/:id
router.delete("/:id", deleteTask);

// ===========================================
// Export Router
// ===========================================

export default router;