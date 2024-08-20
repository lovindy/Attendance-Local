const { Student, Attendance } = require('../models');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// Get all students with attendance records
exports.getStudentsWithAttendance = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Attendance,
          as: 'Attendances', // Use the alias specified in your associations
        },
      ],
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
exports.updateStudent = factory.updateOne(Student, 'student_id');

// Delete student
exports.deleteStudent = factory.deleteOne(Student, 'student_id');

// Update attendance
exports.updateAttendance = factory.updateOne(Attendance, 'attendance_id');

// Delete attendance
exports.deleteAttendance = factory.deleteOne(Attendance, 'attendance_id');
