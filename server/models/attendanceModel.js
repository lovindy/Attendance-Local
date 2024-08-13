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
      studentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'students', // Should match the table name
          key: 'id',
        },
      },
      teacherId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teachers', // Should match the table name
          key: 'teacher_id',
        },
      },
    },
    {
      tableName: 'attendances', // Ensure the table name matches your database schema
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
  );

  return Attendance;
};
