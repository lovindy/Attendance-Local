const { Student } = require('../models');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// Get one student
exports.getStudent = factory.getOne(Student, 'student_id');

// Get all students
exports.getAllStudents = factory.getAll(Student);

// exports.getAllStudents = catchAsync(async (req, res, next) => {
//   const doc = await Students.findAll(); // Fetch all records without filtering

//   if (!doc || doc.length === 0) {
//     return next(new AppError('No students found', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     results: doc.length,
//     data: {
//       data: doc,
//     },
//   });
// });

// Add a new student
exports.addStudent = factory.createOne(Student);

// Update student
exports.updateStudent = factory.updateOne(Student, 'student_id');

// Delete student
exports.deleteStudent = factory.deleteOne(Student, 'student_id');
