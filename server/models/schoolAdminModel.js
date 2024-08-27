module.exports = (sequelize, DataTypes) => {
  const SchoolAdmin = sequelize.define(
    'SchoolAdmin',
    {
      school_admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role: DataTypes.STRING, // e.g., 'Principal', 'Vice Principal'
      assigned_date: DataTypes.DATE,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: 'school_admin',
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
    SchoolAdmin.hasMany(models.Teacher, {
      foreignKey: 'school_admin_id',
      as: 'Teachers',
    });
    SchoolAdmin.hasMany(models.Student, {
      foreignKey: 'school_admin_id',
      as: 'Students',
    });
  };

  return SchoolAdmin;
};
