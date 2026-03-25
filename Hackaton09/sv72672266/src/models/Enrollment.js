module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('active', 'pending'),
      defaultValue: 'pending'
    },
    score: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    }
  });

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Enrollment.belongsTo(models.Course, {
      foreignKey: 'courseId'
    });
  };

  return Enrollment;
};