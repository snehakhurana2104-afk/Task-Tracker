const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    task: {
      type: String,
      required: true,
    },

    timing: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);