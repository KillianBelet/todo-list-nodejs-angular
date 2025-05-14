const express = require("express");
const { getTagues, setTague, deleteTague, editTague, getTague } = require("../controllers/tague.controller");
const router = express.Router();

router.get("/getAll", getTagues);
router.get("/getById/:id", getTague);
router.post("/create", setTague);
router.delete("/delete/:id", deleteTague);
router.patch("/modify/:id", editTague);

module.exports = router;