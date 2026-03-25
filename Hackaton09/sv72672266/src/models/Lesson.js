module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    body: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    paranoid: true
  });

  Lesson.associate = (models) => {
    // pertenece a curso
    Lesson.belongsTo(models.Course, {
      foreignKey: 'courseId'
    });

    // Lesson → Comments
    Lesson.hasMany(models.Comment, {
      foreignKey: 'lessonId'
    });
  };

  return Lesson;
};