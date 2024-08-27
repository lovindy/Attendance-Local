module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    'School',
    {
      school_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: 'schools',
      timestamps: true,
      underscored: true,
    }
  );

  School.associate = (models) => {
    School.hasMany(models.Admin, {
      foreignKey: 'school_id',
      as: 'Admins',
      onDelete: 'CASCADE',
    });
    School.belongsToMany(models.Admin, {
      through: models.SchoolAdmin, // Reference the junction table model
      foreignKey: 'school_id',
      as: 'Administrators',
      onDelete: 'CASCADE',
    });
  };

  return School;
};
