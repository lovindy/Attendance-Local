module.exports = (sequelize, DataTypes) => {
  const DayOfWeek = sequelize.define(
    'Day',
    {
      day_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      day: {
        type: DataTypes.ENUM(
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday'
        ),
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: 'days',
      timestamps: true,
      underscored: true,
    }
  );
  // Association
  DayOfWeek.hasMany(models.Schedule, {
    foreignKey: 'day_id',
    as: 'Schedules',
    onDelete: 'CASCADE',
  });
  return DayOfWeek;
};
