const { Student, Attendance } = require("../models");

// Get all students with attendance records
exports.getStudentsWithAttendance = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [Attendance],
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (student) {
      await student.update(req.body);
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (student) {
      await student.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Record attendance
exports.recordAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update attendance
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      await attendance.update(req.body);
      res.json(attendance);
    } else {
      res.status(404).json({ error: "Attendance record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      await attendance.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Attendance record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
