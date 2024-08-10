const { Teacher } = require("../models");
const factory = require("./handlerFactory");

// Get one teacher
exports.getTeacher = factory.getOne(Teacher);

// Get all teachers
exports.getTeachers = factory.getOne(Teacher);

// Add a new teacher
exports.addTeacher = factory.createOne(Teacher);

// Update teacher
exports.updateTeacher = factory.updateOne(Teacher);

// Delete teacher
exports.deleteTeacher = factory.deleteOne(Teacher);
