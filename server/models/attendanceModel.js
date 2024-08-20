module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    'Attendance',
    {
      attendance_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          'late',
          'present',
          'absent',
          'absent_with_permission'
        ),
        allowNull: false,
        defaultValue: 'absent',
      },
    },
    {
      tableName: 'attendances',
      timestamps: true,
      underscored: true,
    }
  );

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Teacher, {
      foreignKey: 'teacher_id',
      as: 'CheckedBy',
    });
    Attendance.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'Student',
    });
    Attendance.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'Class',
    });
  };

  return Attendance;
};
