// const express = require("express");
// const router = express.Router();
// const tasks = require("../../Tasks");


// router.get("/b", (req, res) => {
//   res.json(tasks);
// });

// router.get("/b/:id", (req, res) => {
//   const found = tasks.some((task) => task.id === parseInt(req.params.id));

//   if (found) {
//     res.json(tasks.filter((task) => task.id === parseInt(req.params.id)));
//   } else {
//     res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
//   }
// });

// // router.post()

// module.exports = router;

