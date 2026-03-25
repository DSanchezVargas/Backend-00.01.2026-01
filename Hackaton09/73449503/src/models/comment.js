const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
      hooks: {
        beforeValidate(comment) {
          if (comment.body) {
            comment.body = comment.body.trim();
          }
          if (!comment.body) {
            throw new Error('Comment body cannot be empty');
          }
        }
      }
    }
  );

  return Comment;
};
