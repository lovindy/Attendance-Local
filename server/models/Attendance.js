module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    id: {
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
        model: "Students",
        key: "id",
      },
    },
  });

  return Attendance;
};
