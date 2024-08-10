const express = require("express");
const classController = require("../controllers/classController");

const router = express.Router();

router.get("/classes", classController.getClasses);
router.post("/classes", classController.addClass);
router.put("/classes/:id", classController.updateClass);
router.delete("/classes/:id", classController.deleteClass);

module.exports = router;
