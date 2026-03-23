// src/server.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const usersRouter       = require('./routes/users.routes');
const coursesRouter     = require('./routes/courses.routes');
const lessonsRouter     = require('./routes/lessons.routes');
const enrollmentsRouter = require('./routes/enrollments.routes');
const commentsRouter    = require('./routes/comments.routes');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ── Root ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'Mini Learning Platform API 🚀',
    version: '1.0.0',
    endpoints: {
      users:       ['GET /users', 'POST /users', 'GET /users/:id'],
      courses:     ['GET /courses', 'POST /courses', 'GET /courses/:slug', 'PUT /courses/:id', 'DELETE /courses/:id'],
      lessons:     ['GET /courses/:courseId/lessons', 'POST /courses/:courseId/lessons', 'PUT /lessons/:id', 'DELETE /lessons/:id'],
      enrollments: ['POST /courses/:courseId/enroll', 'GET /courses/:courseId/enrollments', 'PATCH /enrollments/:id/status'],
      comments:    ['GET /lessons/:lessonId/comments', 'POST /lessons/:lessonId/comments'],
    }
  });
});

// ── Routes ────────────────────────────────────────────
app.use('/users',    usersRouter);
app.use('/courses',  coursesRouter);

// Nested: /courses/:courseId/lessons
app.use('/courses/:courseId/lessons', lessonsRouter);

// PUT/DELETE /lessons/:id (sin courseId prefix)
/*app.put('/lessons/:id',    lessonsRouter);*/
app.use('/lessons', lessonsRouter);
app.delete('/lessons/:id', lessonsRouter);

// Nested: /courses/:courseId/enroll  &  /courses/:courseId/enrollments
app.use('/courses/:courseId/enroll',      enrollmentsRouter);
app.use('/courses/:courseId/enrollments', enrollmentsRouter);
app.patch('/enrollments/:id/status',      enrollmentsRouter);

// Nested: /lessons/:lessonId/comments
app.use('/lessons/:lessonId/comments', commentsRouter);

// ── 404 ───────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada` }));

// ── Global error handler ──────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// ── DB sync + start ───────────────────────────────────
async function start() {
  const syncMode = process.env.DB_SYNC || 'alter';
  const syncOpts = syncMode === 'force' ? { force: true }
                 : syncMode === 'alter' ? { alter: true }
                 : {};

  await sequelize.authenticate();
  console.log('✅ DB conectada');

  await sequelize.sync(syncOpts);
  console.log(`✅ Modelos sincronizados (${syncMode})`);

  app.listen(PORT, () => console.log(`🚀 Server en http://localhost:${PORT}`));
}

start().catch(err => { console.error('❌ Error al iniciar:', err); process.exit(1); });
