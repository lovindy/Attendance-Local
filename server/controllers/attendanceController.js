const { Student, Attendance } = require('../models');
const factory = require('./handlerFactory');

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

// Record attendance
exports.recordAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new student
exports.addStudent = factory.createOne(Student);

// Update student
exports.updateStudent = factory.updateOne(Student);

// Delete student
exports.deleteStudent = factory.deleteOne(Student);

// Update attendance
exports.updateAttendance = factory.updateOne(Attendance);

// Delete attendance
exports.deleteAttendance = factory.deleteOne(Attendance);
