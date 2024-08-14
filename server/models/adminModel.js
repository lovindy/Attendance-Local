module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'admins',
    {
      admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: true, underscored: true }
  );

  return Admin;
};
