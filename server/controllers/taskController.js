import Task from "../models/Task.js";

// ===========================================
// Get All Tasks
// GET : /api/tasks
// ===========================================

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks.",
      error: error.message,
    });
  }
};

// ===========================================
// Get Single Task
// GET : /api/tasks/:id
// ===========================================

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch task.",
      error: error.message,
    });
  }
};

// ===========================================
// Create New Task
// POST : /api/tasks
// ===========================================

export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: newTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create task.",
      error: error.message,
    });
  }
};

// ===========================================
// Update Task
// PUT : /api/tasks/:id
// ===========================================

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update task.",
      error: error.message,
    });
  }
};

// ===========================================
// Delete Task
// DELETE : /api/tasks/:id
// ===========================================

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task.",
      error: error.message,
    });
  }
};