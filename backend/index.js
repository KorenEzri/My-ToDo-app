const express = require("express");
const path = require("path");
const logger = require("./middleware/logger"); // app.use(logger);
const tasks = require("./Tasks");

const app = express();

app.use(express.static(path.join(__dirname, "../src")));

app.get("/b", (req, res) => {
  res.json(tasks);
});

app.get("/b/:id", (req, res) => {
  const found = tasks.some((task) => task.id === parseInt(req.params.id));
  if (found) {
    res.json(tasks.filter((task) => task.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
  }
});

app.post("/b", (req, res) => {});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
