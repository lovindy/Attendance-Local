module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'teacher', 'student'),
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Student, {
      foreignKey: 'user_id',
      as: 'StudentProfile',
      onDelete: 'CASCADE',
    });
    User.hasOne(models.Teacher, {
      foreignKey: 'user_id',
      as: 'TeacherProfile',
      onDelete: 'CASCADE',
    });
    User.hasOne(models.Admin, {
      foreignKey: 'user_id',
      as: 'AdminProfile',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
