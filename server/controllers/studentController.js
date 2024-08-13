const { Student } = require('../models');
const factory = require('./handlerFactory');

// Get one student
exports.getStudent = factory.getOne(Student);

// Get all students
exports.getStudents = factory.getAll(Student);

// Add a new student
exports.addStudent = factory.createOne(Student);

// Update student
exports.updateStudent = factory.updateOne(Student);

// Delete student
exports.deleteStudent = factory.deleteOne(Student);
