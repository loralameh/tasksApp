const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please provide task name"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
