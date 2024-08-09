module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Student;
};
