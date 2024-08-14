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
      tableName: 'attendances', // Ensure the table name matches your database schema
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
      underscored: true, // Converts field names to snake_case for consistency with your database schema
    }
  );

  return Attendance;
};
