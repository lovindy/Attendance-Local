module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'students', // Ensure the table name matches database schema
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
  );

  return Student;
};
