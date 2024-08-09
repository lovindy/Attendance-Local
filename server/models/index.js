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

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Student = require("./Student");
const Attendance = require("./Attendance");
const Teacher = require("./Teacher");
const Admin = require("./Admin");
const Class = require("./Class");
const Subject = require("./Subject");

const models = {
  Student: Student(sequelize, Sequelize.DataTypes),
  Attendance: Attendance(sequelize, Sequelize.DataTypes),
  Teacher: Teacher(sequelize, Sequelize.DataTypes),
  Admin: Admin(sequelize, Sequelize.DataTypes),
  Class: Class(sequelize, Sequelize.DataTypes),
  Subject: Subject(sequelize, Sequelize.DataTypes),
};

// Define relationships
models.Student.hasMany(models.Attendance);
models.Attendance.belongsTo(models.Student);

// Teacher-Student Relationship (if needed)
models.Teacher.hasMany(models.Attendance, {
  as: "Attendances",
  foreignKey: "teacherId",
});
models.Attendance.belongsTo(models.Teacher, {
  as: "Teacher",
  foreignKey: "teacherId",
});

// Admin-Teacher Relationship
models.Admin.hasMany(models.Teacher, { as: "Teachers", foreignKey: "adminId" });
models.Teacher.belongsTo(models.Admin, { as: "Admin", foreignKey: "adminId" });

// Class-Student Relationship
models.Class.hasMany(models.Student, { as: "Students", foreignKey: "classId" });
models.Student.belongsTo(models.Class, { as: "Class", foreignKey: "classId" });

// Teacher-Class Relationship (Optional, if teachers are assigned to specific classes)
models.Teacher.hasMany(models.Class, {
  as: "Classes",
  foreignKey: "teacherId",
});
models.Class.belongsTo(models.Teacher, {
  as: "Teacher",
  foreignKey: "teacherId",
});

// Subject-Class Relationship
models.Subject.belongsToMany(models.Class, {
  through: "ClassSubjects",
  as: "Classes",
  foreignKey: "subjectId",
});
models.Class.belongsToMany(models.Subject, {
  through: "ClassSubjects",
  as: "Subjects",
  foreignKey: "classId",
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
