module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    paranoid: true // soft delete
  });

  Course.associate = (models) => {
    // Instructor
    Course.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner'
    });

    // Course → Lessons
    Course.hasMany(models.Lesson, {
      foreignKey: 'courseId'
    });

    // N:M con User
    Course.belongsToMany(models.User, {
      through: models.Enrollment,
      foreignKey: 'courseId',
      as: 'students'
    });
  };

  return Course;
};