// src/models.js
const { DataTypes, Op } = require('sequelize');
const sequelize = require('./db');

// ─────────────────────────────────────────────
// USER
// ─────────────────────────────────────────────
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: { notEmpty: { msg: 'firstName no puede estar vacío' } },
  },
  lastName: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: { notEmpty: { msg: 'lastName no puede estar vacío' } },
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: { name: 'users_email_unique', msg: 'El email ya está registrado' },
    validate: { isEmail: { msg: 'Email inválido' } },
  },
  passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  role: {
    type: DataTypes.ENUM('admin', 'instructor', 'student'),
    allowNull: false,
    defaultValue: 'student',
    validate: { isIn: { args: [['admin', 'instructor', 'student']], msg: 'Rol inválido' } },
  },
});

// Hooks de normalización
User.beforeValidate((user) => {
  if (user.firstName) user.firstName = user.firstName.trim();
  if (user.lastName)  user.lastName  = user.lastName.trim();
  if (user.email)     user.email     = user.email.trim().toLowerCase();
});

// ─────────────────────────────────────────────
// COURSE
// ─────────────────────────────────────────────
const Course = sequelize.define(
  'Course',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: { name: 'courses_title_unique', msg: 'El título ya existe' },
      validate: {
        len: { args: [5, 200], msg: 'El título debe tener al menos 5 caracteres' },
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: { name: 'courses_slug_unique', msg: 'El slug ya existe' },
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    published:   { type: DataTypes.BOOLEAN, defaultValue: false },
    studentsCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  { paranoid: true }
);

// Scopes
Course.addScope('published', { where: { published: true } });
Course.addScope('withOwner', { include: [{ model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName', 'email'] }] });

// Hooks
Course.beforeValidate((course) => {
  if (course.title) course.title = course.title.trim();
  if (!course.slug && course.title) {
    course.slug = course.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar tildes
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .slice(0, 220);
  }
});

// ─────────────────────────────────────────────
// LESSON
// ─────────────────────────────────────────────
const Lesson = sequelize.define(
  'Lesson',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: { args: [3, 200], msg: 'El título debe tener al menos 3 caracteres' },
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: { args: [20, 65535], msg: 'El cuerpo de la lección debe tener al menos 20 caracteres' },
      },
    },
    order: { type: DataTypes.INTEGER, defaultValue: 0 },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    paranoid: true,
    indexes: [{ unique: true, fields: ['slug', 'courseId'] }],
  }
);

Lesson.beforeValidate((lesson) => {
  if (lesson.title) lesson.title = lesson.title.trim();
  if (!lesson.slug && lesson.title) {
    lesson.slug = lesson.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .slice(0, 220);
  }
});

// ─────────────────────────────────────────────
// ENROLLMENT (tabla intermedia con atributos)
// ─────────────────────────────────────────────
const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId:   { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM('active', 'pending'),
    defaultValue: 'pending',
    validate: { isIn: { args: [['active', 'pending']], msg: 'Status inválido' } },
  },
  score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    validate: { min: 0, max: 100 },
  },
});

// ─────────────────────────────────────────────
// COMMENT
// ─────────────────────────────────────────────
const Comment = sequelize.define('Comment', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  body:     { type: DataTypes.TEXT,    allowNull: false },
  userId:   { type: DataTypes.INTEGER, allowNull: false },
  lessonId: { type: DataTypes.INTEGER, allowNull: false },
});

// Hook: trim + validar mínimo
Comment.beforeCreate((comment) => {
  if (comment.body) comment.body = comment.body.trim();
  if (!comment.body || comment.body.length < 3) {
    throw new Error('El comentario debe tener al menos 3 caracteres');
  }
});
Comment.beforeUpdate((comment) => {
  if (comment.changed('body')) {
    comment.body = comment.body.trim();
    if (comment.body.length < 3) throw new Error('El comentario debe tener al menos 3 caracteres');
  }
});

// ─────────────────────────────────────────────
// ASOCIACIONES
// ─────────────────────────────────────────────

// User (instructor) 1:N Course
User.hasMany(Course, { foreignKey: 'ownerId', as: 'courses' });
Course.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

// Course 1:N Lesson
Course.hasMany(Lesson, { foreignKey: 'courseId', as: 'lessons' });
Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// User N:M Course (Enrollment)
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId',   as: 'enrolledCourses' });
Course.belongsToMany(User,  { through: Enrollment, foreignKey: 'courseId', as: 'students' });

// Directas para poder hacer include de Enrollment sola
User.hasMany(Enrollment,   { foreignKey: 'userId',   as: 'enrollments' });
Course.hasMany(Enrollment, { foreignKey: 'courseId', as: 'enrollments' });
Enrollment.belongsTo(User,   { foreignKey: 'userId',   as: 'student' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Lesson 1:N Comment
Lesson.hasMany(Comment, { foreignKey: 'lessonId', as: 'comments' });
Comment.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });

// User 1:N Comment
User.hasMany(Comment,   { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = { sequelize, User, Course, Lesson, Enrollment, Comment, Op };
