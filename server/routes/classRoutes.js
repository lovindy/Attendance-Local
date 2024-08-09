const express = require("express");
const {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const router = express.Router();

router.get("/classes", getClasses);
router.post("/classes", addClass);
router.put("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);

module.exports = router;
