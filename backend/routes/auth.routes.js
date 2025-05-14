const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

/*
router.post("/create", setTask);
router.delete("/delete/:id", deleteTask);
router.patch("/modify/:id", editTask);
register
*/


module.exports = router;
