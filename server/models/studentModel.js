module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      student_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      tableName: 'students',
      timestamps: true,
      underscored: true,
    }
  );

  Student.associate = (models) => {
    // Student belongs to a User
    Student.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
      onDelete: 'CASCADE',
    });

    // Student belongs to a Class
    Student.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'Class',
      onDelete: 'CASCADE',
    });

    // Student has many Attendances
    Student.hasMany(models.Attendance, {
      foreignKey: 'student_id',
      as: 'Attendances',
      onDelete: 'CASCADE',
    });
  };

  return Student;
};
