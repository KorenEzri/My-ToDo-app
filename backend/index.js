//BASE PREP
const express = require("express");
const uuid = require("uuid");
const path = require("path");
const binDir = path.join(__dirname, "bins/");
const binDirPath = path.resolve(
  "C:UserskorenDocumentsGitHubpre-course-2021-final-boilerplate\backend\bins"
);
let tasks = require("./Tasks");
const fs = require("fs");
const { error } = require("console");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../src")));
//BASE END

//ROUTES

//on GET request: show all bin IDs
app.get("/b", (req, res) => {
  fs.readdir(`backend/bins/`, "utf8", (err, files) => {
    listofTasks = [];
    files.forEach((file) => {
      listofTasks.push(file);
    });
    if (listofTasks.length < 1) {
      return res.status(400).json({
        msg: `No task found`,
      });
    } else {
      res.json(listofTasks);
    }
  });
});

//on GET request: if the specified ID exists, show appropriate bin
app.get("/b/:id", (req, res) => {
  fs.readFile(`backend/bins/${req.params.id}.json`, "utf8", (err, data) => {
    res.json(data);
  });
});

//on a POST request, create a new bin, assign an ID to it, and show it
app.post("/b", (req, res) => {
  let obj = { task: [] };
  obj.task.push({
    date: req.body.date,
    text: req.body.text,
    priority: req.body.priority,
  });

  let json = JSON.stringify(obj, null, 2);
  const binID = uuid.v4();
  fs.writeFile(`backend/bins/${binID}.json`, json, "utf8", () => {
    if (!req.body.date || !req.body.text || !req.body.priority) {
      return res
        .status(400)
        .json({ msg: "The task info is incorrect or missing" });
    }
    res.json(`Created bin. id: ${binID}`);
  });
});

//on PUT request: update the bin according to it's id
app.put("/b/:id", (req, res) => {
  let obj = { task: [] };
  obj.task.push({
    date: req.body.date,
    text: req.body.text,
    priority: req.body.priority,
  });
  let json = JSON.stringify(obj, null, 2);
  fs.writeFile(`backend/bins/${req.params.id}.json`, json, "utf8", (err) => {
    if (!json) {
      res.json(`There was an error updating the bin`);
    }
  });

  res.json(`Updated bin. id: ${req.params.id}, bin: ${json}`);
});

//on DELETE request: delete the specified task
app.delete("/b/:id", (req, res) => {
  fs.unlink(`backend/bins/${req.params.id}.json`, (err) => {
    res.json(`The bin ${req.params.id} was deleted`);
  });
  // const found = tasks.some((task) => task.id == req.params.id);
  // if (found) {
  //   const index = tasks.findIndex(
  //     (task) => task.id === parseInt(req.params.id)
  //   );
  //   tasks.splice(index, 1);
  //   res.json({ msg: "task deleted", tasks });
  // } else {
  //   res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
  // }
});

//on GET request: show all tasks
// app.get("/b", (req, res) => {
//   res.json(tasks);
// });

//on GET request: if the specified ID exists, show appropriate task
// app.get("/b/:id", (req, res) => {
//   const found = tasks.some((task) => task.id == req.params.id);
//   if (found) {
//     res.json(tasks.filter((task) => task.id == req.params.id));
//   } else {
//     res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
//   }
// });

//on POST request: create a new task, assign an ID to it, and show it
// app.post("/b", (req, res) => {
//   const newTask = {
//     id: uuid.v4(),
//     date: req.body.date,
//     text: req.body.text,
//     priority: req.body.priority,
//   };

//   if (!newTask.date || !newTask.text || !newTask.priority) {
//     return res
//       .status(400)
//       .json({ msg: "The task info is incorrect or missing" });
//   }

//   tasks.push(newTask);
//   res.json(newTask);
// });

//on PUT request: update the task according to it's id
// app.put("/b/:id", (req, res) => {
//   const found = tasks.some((task) => task.id == req.params.id);
//   if (found) {
//     const updatedTask = req.body;
//     tasks.forEach((task) => {
//       if (task.id == req.params.id) {
//         task.date = updatedTask.date ? updatedTask.date : task.date;
//         task.text = updatedTask.text ? updatedTask.text : task.text;
//         task.priority = updatedTask.priority
//           ? updatedTask.priority
//           : task.priority;

//         res.json({ msg: "Task updated", task });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
//   }
// });

//on DELETE request: delete the specified task
// app.delete("/b/:id", (req, res) => {
//   const found = tasks.some((task) => task.id == req.params.id);
//   if (found) {
//     const index = tasks.findIndex(
//       (task) => task.id === parseInt(req.params.id)
//     );
//     tasks.splice(index, 1);
//     res.json({ msg: "task deleted", tasks });
//   } else {
//     res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
//   }
// });

//ROUTES END

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
