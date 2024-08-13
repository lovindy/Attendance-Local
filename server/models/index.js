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
// User Role Relationships
models.User.hasOne(models.Student, {
  foreignKey: 'userId',
  as: 'StudentProfile',
});
models.Student.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'User',
});

models.User.hasOne(models.Teacher, {
  foreignKey: 'userId',
  as: 'TeacherProfile',
});
models.Teacher.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'User',
});

models.User.hasOne(models.Admin, {
  foreignKey: 'userId',
  as: 'AdminProfile',
});
models.Admin.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'User',
});

// Admin-Teacher Relationship
models.Admin.hasMany(models.Teacher, {
  foreignKey: 'adminId',
  as: 'Teachers',
});
models.Teacher.belongsTo(models.Admin, {
  foreignKey: 'adminId',
  as: 'Admin',
});

// A teacher checks many attendance records
models.Teacher.hasMany(models.Attendance, {
  foreignKey: 'teacherId',
  as: 'CheckedAttendances',
});
models.Attendance.belongsTo(models.Teacher, {
  foreignKey: 'teacherId',
  as: 'CheckedBy',
});

// A student has many attendance records
models.Student.hasMany(models.Attendance, {
  foreignKey: 'studentId',
  as: 'Attendances',
});
models.Attendance.belongsTo(models.Student, {
  foreignKey: 'studentId',
  as: 'Student',
});

// Class-Student Relationship
models.Class.hasMany(models.Student, {
  foreignKey: 'classId',
  as: 'Students',
});
models.Student.belongsTo(models.Class, {
  foreignKey: 'classId',
  as: 'Class',
});

// Subject-Class Relationship
models.Subject.belongsToMany(models.Class, {
  through: 'ClassSubjects',
  foreignKey: 'subjectId',
  as: 'Classes',
});
models.Class.belongsToMany(models.Subject, {
  through: 'ClassSubjects',
  foreignKey: 'classId',
  as: 'Subjects',
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

// // Export models along with sequelize instance
// module.exports = {
//   ...models,
//   sequelize,
//   Sequelize,
// };
