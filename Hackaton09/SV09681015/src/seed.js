// src/seed.js
require('dotenv').config();
const { sequelize, User, Course, Lesson, Enrollment, Comment } = require('./models');

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('📦 Iniciando seed...');

  // Users
  const [ada] = await User.findOrCreate({
    where: { email: 'ada@dev.io' },
    defaults: { firstName: 'Ada', lastName: 'Lovelace', passwordHash: 'hashed_x', role: 'instructor' },
  });
  const [linus] = await User.findOrCreate({
    where: { email: 'linus@dev.io' },
    defaults: { firstName: 'Linus', lastName: 'Torvalds', passwordHash: 'hashed_y', role: 'student' },
  });
  const [grace] = await User.findOrCreate({
    where: { email: 'grace@dev.io' },
    defaults: { firstName: 'Grace', lastName: 'Hopper', passwordHash: 'hashed_z', role: 'student' },
  });
  const [admin] = await User.findOrCreate({
    where: { email: 'admin@dev.io' },
    defaults: { firstName: 'Admin', lastName: 'Root', passwordHash: 'hashed_admin', role: 'admin' },
  });
  console.log('✅ Users creados');

  // Courses
  const [nodeIntro] = await Course.findOrCreate({
    where: { slug: 'intro-a-node' },
    defaults: {
      title: 'Intro a Node.js',
      description: 'Aprende Node.js desde cero',
      published: true,
      ownerId: ada.id,
    },
  });
  const [advJs] = await Course.findOrCreate({
    where: { slug: 'javascript-avanzado' },
    defaults: {
      title: 'JavaScript Avanzado',
      description: 'Closures, prototipos y más',
      published: false,
      ownerId: ada.id,
    },
  });
  console.log('✅ Courses creados');

  // Lessons
  const lessonsData = [
    { title: 'Setup del entorno', body: 'Instala Node.js, nvm y configura tu editor de código favorito para empezar a desarrollar.', order: 1, courseId: nodeIntro.id },
    { title: 'HTTP básico',       body: 'Aprende los fundamentos del protocolo HTTP: verbos, cabeceras, status codes y ciclo request-response.', order: 2, courseId: nodeIntro.id },
    { title: 'Express y rutas',   body: 'Crea tu primer servidor Express, define rutas y middlewares básicos para construir una API REST.', order: 3, courseId: nodeIntro.id },
    { title: 'Closures en JS',    body: 'Entiende qué son los closures, cómo funcionan el scope léxico y la captura de variables en JavaScript.', order: 1, courseId: advJs.id },
  ];

  for (const l of lessonsData) {
    await Lesson.findOrCreate({ where: { slug: l.slug || l.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''), courseId: l.courseId }, defaults: l });
  }
  console.log('✅ Lessons creadas');

  // Enrollments
  const [enr1] = await Enrollment.findOrCreate({
    where: { userId: linus.id, courseId: nodeIntro.id },
    defaults: { status: 'active', score: 85.5 },
  });
  const [enr2] = await Enrollment.findOrCreate({
    where: { userId: grace.id, courseId: nodeIntro.id },
    defaults: { status: 'pending' },
  });
  console.log('✅ Enrollments creados');

  // Update studentsCount
  const activeCount = await Enrollment.count({ where: { courseId: nodeIntro.id, status: 'active' } });
  await nodeIntro.update({ studentsCount: activeCount });

  // Comments
  const lessons = await Lesson.findAll({ where: { courseId: nodeIntro.id }, limit: 2 });
  if (lessons[0]) {
    await Comment.findOrCreate({
      where: { userId: linus.id, lessonId: lessons[0].id, body: '¡Excelente introducción! Muy clara.' },
      defaults: {},
    });
    await Comment.findOrCreate({
      where: { userId: grace.id, lessonId: lessons[0].id, body: 'Me ayudó mucho para empezar con Node.' },
      defaults: {},
    });
  }
  console.log('✅ Comments creados');

  console.log('\n🎉 Seed completado. Datos listos para la demo.');
  process.exit(0);
}

seed().catch(err => { console.error('❌ Seed error:', err); process.exit(1); });
