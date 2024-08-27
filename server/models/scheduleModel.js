module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Schedule',
    {
      schedule_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME,
    },
    {
      tableName: 'schedules',
      timestamps: true,
      underscored: true,
    }
  );

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'Class',
      onDelete: 'CASCADE',
    });
    Schedule.belongsTo(models.DayOfWeek, {
      foreignKey: 'day_id',
      as: 'Day',
    });

    Schedule.belongsTo(models.Session, {
      foreignKey: 'session_id',
      as: 'Session',
    });

    Schedule.belongsToMany(models.Teacher, {
      through: 'teacher_schedules', // Many-to-Many relationship
      foreignKey: 'schedule_id',
      as: 'Teachers',
    });

    Schedule.belongsToMany(models.Subject, {
      through: 'schedule_subjects', // Many-to-Many relationship
      foreignKey: 'schedule_id',
      as: 'Subjects',
    });
  };

  return Schedule;
};
