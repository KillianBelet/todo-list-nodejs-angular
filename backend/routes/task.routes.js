const express = require("express");
const { getTasks, setTask, deleteTask, editTask, completedTask } = require("../controllers/task.controller");
const requireAuth = require('../middleware/auth.middleware'); 
const router = express.Router();



router.get("/getAll", getTasks);
router.post("/create", setTask);
router.delete("/delete/:id", deleteTask);
router.patch("/modify/:id", editTask);


module.exports = router;
