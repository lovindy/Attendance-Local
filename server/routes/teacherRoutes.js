const express = require("express");
const {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

router.get("/teachers", getTeachers);
router.post("/teachers", addTeacher);
router.put("/teachers/:id", updateTeacher);
router.delete("/teachers/:id", deleteTeacher);

module.exports = router;
