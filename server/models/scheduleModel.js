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
      day: DataTypes.STRING,
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
    });

    Schedule.belongsToMany(models.Teacher, {
      through: 'teacher_schedule', // or models.TeacherSchedule if it's a model
      foreignKey: 'schedule_id',
      as: 'Teachers',
    });

    Schedule.belongsToMany(models.Subject, {
      through: 'class_subjects', // or models.ClassSubjects if it's a model
      foreignKey: 'schedule_id',
      as: 'Subjects',
    });

    Schedule.belongsTo(models.DayOfWeek, {
      foreignKey: 'day_id',
      as: 'Day',
    });
  };

  return Schedule;
};
