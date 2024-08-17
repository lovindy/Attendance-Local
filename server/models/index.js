const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import all the models
const User = require('./userModel');
const Attendance = require('./attendanceModel');
const Student = require('./studentModel');
const Teacher = require('./teacherModel');
const Admin = require('./adminModel');
const ClassModel = require('./classModel');
const Subject = require('./subjectModel');

class Models {
  constructor() {
    this.sequelize = sequelize;
    this.Sequelize = Sequelize;

    // Initialize models
    this.User = User(sequelize, Sequelize.DataTypes);
    this.Attendance = Attendance(sequelize, Sequelize.DataTypes);
    this.Student = Student(sequelize, Sequelize.DataTypes);
    this.Teacher = Teacher(sequelize, Sequelize.DataTypes);
    this.Admin = Admin(sequelize, Sequelize.DataTypes);
    this.Class = ClassModel(sequelize, Sequelize.DataTypes);
    this.Subject = Subject(sequelize, Sequelize.DataTypes);

    // Set up associations
    this.associate();
  }

  associate() {
    // User Role student
    this.User.hasOne(this.Student, {
      foreignKey: 'user_id',
      as: 'StudentProfile',
    });
    this.Student.belongsTo(this.User, {
      foreignKey: 'user_id',
      as: 'User',
    });

    // User Role teacher
    this.User.hasOne(this.Teacher, {
      foreignKey: 'user_id',
      as: 'TeacherProfile',
    });
    this.Teacher.belongsTo(this.User, {
      foreignKey: 'user_id',
      as: 'User',
    });

    // User Role admin
    this.User.hasOne(this.Admin, {
      foreignKey: 'user_id',
      as: 'AdminProfile',
    });
    this.Admin.belongsTo(this.User, {
      foreignKey: 'user_id',
      as: 'User',
    });

    // Admin-Teacher Relationship
    this.Admin.hasMany(this.Teacher, {
      foreignKey: 'admin_id',
      as: 'Teachers',
    });
    this.Teacher.belongsTo(this.Admin, {
      foreignKey: 'admin_id',
      as: 'Admin',
    });

    // A teacher checks many attendance records
    this.Teacher.hasMany(this.Attendance, {
      foreignKey: 'teacher_id',
      as: 'CheckedAttendances',
    });
    this.Attendance.belongsTo(this.Teacher, {
      foreignKey: 'teacher_id',
      as: 'CheckedBy',
    });

    // A student has many attendance records
    this.Student.hasMany(this.Attendance, {
      foreignKey: 'student_id',
      as: 'Attendances',
    });
    this.Attendance.belongsTo(this.Student, {
      foreignKey: 'student_id',
      as: 'Student',
    });

    // Class-Student Relationship
    this.Class.hasMany(this.Student, {
      foreignKey: 'class_id',
      as: 'Students',
    });
    this.Student.belongsTo(this.Class, {
      foreignKey: 'class_id',
      as: 'Class',
    });

    // Subject-Class Relationship
    this.Subject.belongsToMany(this.Class, {
      through: 'ClassSubjects',
      foreignKey: 'subject_id',
      as: 'Classes',
    });
    this.Class.belongsToMany(this.Subject, {
      through: 'ClassSubjects',
      foreignKey: 'class_id',
      as: 'Subjects',
    });
  }
}

// Export an instance of the Models class
const models = new Models();

module.exports = models;
