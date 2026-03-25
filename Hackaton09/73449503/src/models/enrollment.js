const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {}

  Enrollment.init(
    {
      status: {
        type: DataTypes.ENUM('active', 'pending'),
        allowNull: false,
        defaultValue: 'pending'
      },
      score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Enrollment',
      tableName: 'enrollments',
      indexes: [
        { unique: true, fields: ['userId', 'courseId'] }
      ]
    }
  );

  return Enrollment;
};
