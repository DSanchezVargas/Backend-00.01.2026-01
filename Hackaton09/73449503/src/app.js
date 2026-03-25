const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/users.routes');
const coursesRouter = require('./routes/courses.routes');
const lessonsRouter = require('./routes/lessons.routes');
const enrollmentsRouter = require('./routes/enrollments.routes');
const commentsRouter = require('./routes/comments.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/', lessonsRouter);
app.use('/', enrollmentsRouter);
app.use('/', commentsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: err.message });
  }
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
