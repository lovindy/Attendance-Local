module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    'Teacher',
    {
      teacher_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'teachers',
      timestamps: true,
      underscored: true,
    }
  );

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
    });
    Teacher.belongsTo(models.Admin, {
      foreignKey: 'admin_id',
      as: 'Admin',
    });
    Teacher.hasMany(models.Attendance, {
      foreignKey: 'teacher_id',
      as: 'CheckedAttendances',
    });
  };

  return Teacher;
};
