module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'students',
    {
      student_id: {
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
      tableName: 'students',
      timestamps: true,
      underscored: true,
    }
  );

  return Student;
};
