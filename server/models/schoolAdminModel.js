// models/schoolAdminModel.js
module.exports = (sequelize, DataTypes) => {
  const SchoolAdmin = sequelize.define(
    'SchoolAdmin',
    {
      // Define additional columns here
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      school_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      // Add additional fields as needed
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assigned_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: 'school_admins',
      timestamps: true,
      underscored: true,
    }
  );

  SchoolAdmin.associate = (models) => {
    SchoolAdmin.belongsTo(models.Admin, {
      foreignKey: 'admin_id',
      as: 'Admin',
    });
    SchoolAdmin.belongsTo(models.School, {
      foreignKey: 'school_id',
      as: 'School',
    });
  };

  return SchoolAdmin;
};
