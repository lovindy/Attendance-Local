module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
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
    {
      tableName: 'admins',
      timestamps: true,
      underscored: true,
    }
  );

  Admin.associate = (models) => {
    Admin.hasMany(models.Teacher, {
      foreignKey: 'admin_id',
      as: 'Teachers',
      onDelete: 'CASCADE',
    });
    Admin.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
      onDelete: 'CASCADE',
    });
  };

  return Admin;
};
