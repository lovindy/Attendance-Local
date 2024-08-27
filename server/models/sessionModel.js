module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      session_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      session_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      session_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'sessions',
      timestamps: true,
      underscored: true,
    }
  );
  return Session;
};
