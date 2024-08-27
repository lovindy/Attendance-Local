module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
    Admin.belongsToMany(models.School, {
      through: models.SchoolAdmin, // Reference the junction table model
      foreignKey: 'admin_id',
      as: 'ParticipatingSchools',
      onDelete: 'CASCADE',
    });
  };

  return Admin;
};
