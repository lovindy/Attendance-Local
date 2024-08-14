module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    'teachers',
    {
      teacher_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'teachers',
      timestamps: true,
      underscored: true,
    }
  );

  return Teacher;
};
