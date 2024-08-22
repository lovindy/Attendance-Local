const { User, Admin, Teacher, Student } = require('../models');
const factory = require('./handlerFactory');

// Get one User
exports.getUser = factory.getOne(User, 'user_id', [
  { model: Admin, as: 'AdminProfile' },
  { model: Teacher, as: 'TeacherProfile' },
  { model: Student, as: 'StudentProfile' },
]);

// Get all Users
exports.getAllUsers = factory.getAll(User, {}, [
  { model: Admin, as: 'AdminProfile' },
  { model: Teacher, as: 'TeacherProfile' },
  { model: Student, as: 'StudentProfile' },
]);

// Add a new User with role-specific logic
exports.addUser = factory.createOne(User, {
  admin: Admin,
  teacher: Teacher,
  student: Student,
});

// Update User
exports.updateUser = factory.updateOne(User, 'user_id');

// Delete User
exports.deleteUser = factory.deleteOne(User, 'user_id');
