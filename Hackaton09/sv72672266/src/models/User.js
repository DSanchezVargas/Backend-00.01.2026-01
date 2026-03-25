module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'instructor', 'student'),
      defaultValue: 'student'
    }
  });

  User.associate = (models) => {
    // Instructor → Courses
    User.hasMany(models.Course, {
      foreignKey: 'ownerId',
      as: 'ownedCourses'
    });

    // User → Comments
    User.hasMany(models.Comment, {
      foreignKey: 'userId'
    });

    // N:M con Course
    User.belongsToMany(models.Course, {
      through: models.Enrollment,
      foreignKey: 'userId',
      as: 'enrolledCourses'
    });
  };

  return User;
};