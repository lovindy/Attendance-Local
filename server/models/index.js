// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

// Import sequelize and database
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import all the models
const User = require('./userModel');
const Attendance = require('./attendanceModel');
const Student = require('./studentModel');
const Teacher = require('./teacherModel');
const Admin = require('./adminModel');
const Class = require('./classModel');
const Subject = require('./subjectModel');

// Initialize models
const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Attendance: Attendance(sequelize, Sequelize.DataTypes),
  Student: Student(sequelize, Sequelize.DataTypes),
  Teacher: Teacher(sequelize, Sequelize.DataTypes),
  Admin: Admin(sequelize, Sequelize.DataTypes),
  Class: Class(sequelize, Sequelize.DataTypes),
  Subject: Subject(sequelize, Sequelize.DataTypes),
};

// Define relationships

// User Role student
models.User.hasOne(models.Student, {
  foreignKey: 'user_id',
  as: 'StudentProfile',
});
models.Student.belongsTo(models.User, {
  foreignKey: 'user_id',
  as: 'User',
});
// User Role teacher
models.User.hasOne(models.Teacher, {
  foreignKey: 'user_id',
  as: 'TeacherProfile',
});
models.Teacher.belongsTo(models.User, {
  foreignKey: 'user_id',
  as: 'User',
});
// User Role admin
models.User.hasOne(models.Admin, {
  foreignKey: 'user_id',
  as: 'AdminProfile',
});
models.Admin.belongsTo(models.User, {
  foreignKey: 'user_id',
  as: 'User',
});

// Admin-Teacher Relationship
models.Admin.hasMany(models.Teacher, {
  foreignKey: 'admin_id',
  as: 'Teachers',
});
models.Teacher.belongsTo(models.Admin, {
  foreignKey: 'admin_id',
  as: 'Admin',
});

// A teacher checks many attendance records
models.Teacher.hasMany(models.Attendance, {
  foreignKey: 'teacher_id',
  as: 'CheckedAttendances',
});
models.Attendance.belongsTo(models.Teacher, {
  foreignKey: 'teacher_id',
  as: 'CheckedBy',
});

// A student has many attendance records
models.Student.hasMany(models.Attendance, {
  foreignKey: 'student_id',
  as: 'Attendances',
});
models.Attendance.belongsTo(models.Student, {
  foreignKey: 'student_id',
  as: 'Student',
});

// Class-Student Relationship
models.Class.hasMany(models.Student, {
  foreignKey: 'class_id',
  as: 'Students',
});
models.Student.belongsTo(models.Class, {
  foreignKey: 'class_id',
  as: 'Class',
});

// Subject-Class Relationship
models.Subject.belongsToMany(models.Class, {
  through: 'ClassSubjects',
  foreignKey: 'subject_id',
  as: 'Classes',
});
models.Class.belongsToMany(models.Subject, {
  through: 'ClassSubjects',
  foreignKey: 'class_id',
  as: 'Subjects',
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

// Export models along with sequelize instance
// module.exports = {
//   ...models,
//   sequelize,
//   Sequelize,
// };
