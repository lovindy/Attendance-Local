// Admin Model Example (Refined)
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: 'admins',
      timestamps: true,
      underscored: true,
    }
  );

  Admin.associate = (models) => {
    Admin.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
      onDelete: 'CASCADE',
    });
    Admin.hasMany(models.Teacher, {
      foreignKey: 'admin_id',
      as: 'Teachers',
      onDelete: 'CASCADE',
    });
  };

  return Admin;
};
