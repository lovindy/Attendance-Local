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
      present: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
  };

  return Attendance;
};
