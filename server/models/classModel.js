module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    class_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  return Class;
};
