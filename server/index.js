const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cors = require("cors");

const Task = require("./taskModel");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  })
);
//get all tasks
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

//add a task
app.post("/", async (req, res) => {
  try {
    const newTask = new Task({ task: req.body.task });
    await newTask.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

//edit one task
app.put("/:taskId", async (req, res) => {
  try {
    const {
      params: { taskId },
      body: { task, isChecked },
    } = req;

    const updatedData = task ? { isChecked, isChecked } : { isChecked };

    const updatedtask = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });
    res.status(200).json(updatedtask);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

//delete one task
app.delete("/:taskId", async (req, res) => {
  try {
    const {
      params: { taskId },
    } = req;
    const task = await Task.deleteOne({ _id: taskId });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

//delete all tasks
app.delete("/", async (req, res) => {
  try {
    const tasks = await Task.deleteMany({});
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

const connectDB = (url) => {
  return mongoose.connect(url);
};
app.listen(port, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`app is listening on port ${process.env.PORT}`);
});
