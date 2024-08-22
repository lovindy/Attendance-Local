module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      student_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: 'students',
      timestamps: true,
      underscored: true,
    }
  );

  Student.associate = (models) => {
    Student.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
      onDelete: 'CASCADE',
    });

    Student.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'Class',
      onDelete: 'CASCADE',
    });

    Student.hasMany(models.Attendance, {
      foreignKey: 'student_id',
      as: 'Attendances',
      onDelete: 'CASCADE',
    });
  };

  return Student;
};
