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
app.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});
app.post("/", async (req, res) => {
  console.log(req.body.task);
  const newTask = new Task({ task: req.body.task });
  await newTask.save();
  res.json(newTask);
});
app.delete("/:taskId", async (req, res) => {
  const {
    params: { taskId },
  } = req;
  console.log(taskId);
  const task = await Task.deleteOne({ _id: taskId });
  res.json(task);
});

const connectDB = (url) => {
  return mongoose.connect(url);
};
app.listen(port, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`app is listening on port ${process.env.PORT}`);
});
