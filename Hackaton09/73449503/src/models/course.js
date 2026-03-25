const { Model } = require('sequelize');
const slugify = require('../utils/slugify');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {}

  Course.init(
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [5, 200]
        }
      },
      slug: {
        type: DataTypes.STRING(220),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true }
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      studentsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Course',
      tableName: 'courses',
      paranoid: true,
      hooks: {
        beforeValidate(course) {
          if (course.title) {
            course.title = course.title.trim();
          }
          if (course.description) {
            course.description = course.description.trim();
          }
          if (!course.slug && course.title) {
            course.slug = slugify(course.title);
          } else if (course.slug) {
            course.slug = slugify(course.slug);
          }
        }
      }
    }
  );

  Course.addScope('published', {
    where: { published: true }
  });

  return Course;
};
