import mongoose from "mongoose";

// ===========================================
// Task Schema
// ===========================================

const taskSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    task: {
      type: String,
      required: true,
      trim: true,
    },

    timing: {
      type: String,
      required: true,
      trim: true,
    },

    remarks: {
      type: String,
      enum: ["Pending", "In-Process", "Closed"],
      default: "Pending",
    },

    completedTime: {
      type: String,
      default: "",
    },

    completedDate: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ===========================================
// Export Model
// ===========================================

const Task = mongoose.model("Task", taskSchema);

export default Task;