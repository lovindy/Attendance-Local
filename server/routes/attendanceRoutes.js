const express = require("express");
const {
  getStudentsWithAttendance,
  addStudent,
  updateStudent,
  deleteStudent,
  recordAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

// Student routes
router.get("/students", getStudentsWithAttendance);
router.post("/students", addStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

// Attendance routes
router.post("/attendance", recordAttendance);
router.put("/attendance/:id", updateAttendance);
router.delete("/attendance/:id", deleteAttendance);

module.exports = router;
