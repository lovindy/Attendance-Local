module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      student_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    });
    Student.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'Class',
    });
    Student.hasMany(models.Attendance, {
      foreignKey: 'student_id',
      as: 'Attendances',
    });
  };

  return Student;
};
