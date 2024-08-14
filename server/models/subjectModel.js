module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    'subject',
    {
      subject_id: {
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
    },
    { timestamps: true, underscored: true }
  );

  return Subject;
};
