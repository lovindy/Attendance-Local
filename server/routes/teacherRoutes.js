const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.get("/teachers", teacherController.getTeachers);
router.post("/teachers", teacherController.addTeacher);
router.put("/teachers/:id", teacherController.updateTeacher);
router.delete("/teachers/:id", teacherController.deleteTeacher);

module.exports = router;
