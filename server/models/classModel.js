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
    // Class has many Students
    Class.hasMany(models.Student, {
      foreignKey: 'class_id',
      as: 'Students',
      onDelete: 'CASCADE',
    });

    // Class has many Attendances
    Class.hasMany(models.Attendance, {
      foreignKey: 'class_id',
      as: 'Attendances',
      onDelete: 'CASCADE',
    });
  };

  return Class;
};
