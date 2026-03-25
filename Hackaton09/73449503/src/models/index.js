const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = require('./user')(sequelize, DataTypes);
const Course = require('./course')(sequelize, DataTypes);
const Lesson = require('./lesson')(sequelize, DataTypes);
const Enrollment = require('./enrollment')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize, DataTypes);

User.hasMany(Course, { as: 'ownedCourses', foreignKey: 'ownerId' });
Course.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

Course.hasMany(Lesson, { as: 'lessons', foreignKey: 'courseId' });
Lesson.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });

User.belongsToMany(Course, { through: Enrollment, as: 'enrolledCourses', foreignKey: 'userId' });
Course.belongsToMany(User, { through: Enrollment, as: 'students', foreignKey: 'courseId' });

Enrollment.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Enrollment.belongsTo(Course, { as: 'course', foreignKey: 'courseId' });
User.hasMany(Enrollment, { as: 'enrollments', foreignKey: 'userId' });
Course.hasMany(Enrollment, { as: 'enrollments', foreignKey: 'courseId' });

Lesson.hasMany(Comment, { as: 'comments', foreignKey: 'lessonId' });
Comment.belongsTo(Lesson, { as: 'lesson', foreignKey: 'lessonId' });

User.hasMany(Comment, { as: 'comments', foreignKey: 'userId' });
Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Course,
  Lesson,
  Enrollment,
  Comment
};
