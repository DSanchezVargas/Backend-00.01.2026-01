const { Model } = require('sequelize');
const slugify = require('../utils/slugify');

module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {}

  Lesson.init(
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { notEmpty: true }
      },
      slug: {
        type: DataTypes.STRING(220),
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { len: [20, 100000] }
      },
      order: {
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
      modelName: 'Lesson',
      tableName: 'lessons',
      paranoid: true,
      indexes: [
        { unique: true, fields: ['courseId', 'slug'] }
      ],
      hooks: {
        beforeValidate(lesson) {
          if (lesson.title) {
            lesson.title = lesson.title.trim();
          }
          if (lesson.body) {
            lesson.body = lesson.body.trim();
          }
          if (!lesson.slug && lesson.title) {
            lesson.slug = slugify(lesson.title);
          } else if (lesson.slug) {
            lesson.slug = slugify(lesson.slug);
          }
        }
      }
    }
  );

  return Lesson;
};
