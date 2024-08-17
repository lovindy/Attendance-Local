module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
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
    },
    {
      tableName: 'classes',
      timestamps: true,
      underscored: true,
    }
  );

  Class.associate = (models) => {
    Class.hasMany(models.Student, {
      foreignKey: 'class_id',
      as: 'Students',
    });
    Class.belongsToMany(models.Subject, {
      through: 'ClassSubjects',
      foreignKey: 'class_id',
      as: 'Subjects',
    });
  };

  return Class;
};
