const express = require("express");
const attendanceController = require("../controllers/attendanceController");

const router = express.Router();

// Student routes
router.get("/students", attendanceController.getStudentsWithAttendance);
router.post("/students", attendanceController.addStudent);
router.put("/students/:id", attendanceController.updateStudent);
router.delete("/students/:id", attendanceController.deleteStudent);

// Attendance routes
router.post("/attendance", attendanceController.recordAttendance);
router.put("/attendance/:id", attendanceController.updateAttendance);
router.delete("/attendance/:id", attendanceController.deleteAttendance);

module.exports = router;
