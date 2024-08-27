module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
      class_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      grade: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: 'classes',
      timestamps: true,
      underscored: true,
    }
  );

  Class.associate = (models) => {
    Class.belongsTo(models.Teacher, {
      foreignKey: 'teacher_id',
      as: 'Teacher',
    });
    Class.belongsTo(models.School, {
      foreignKey: 'school_id',
      as: 'School',
    });
    Class.hasMany(models.Student, {
      foreignKey: 'class_id',
      as: 'Students',
    });
  };

  return Class;
};
