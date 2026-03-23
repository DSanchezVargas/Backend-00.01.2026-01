// src/routes/lessons.routes.js
const router = require('express').Router({ mergeParams: true });
const { Lesson, Course, Op } = require('../models');

// ── POST /courses/:courseId/lessons ────────────────────
router.post('/', async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    // Auto-incrementar order
    const maxOrder = await Lesson.max('order', { where: { courseId } }) || 0;

    const { title, body, slug } = req.body;
    const lesson = await Lesson.create({
      title,
      body,
      slug: slug || undefined,
      order: maxOrder + 1,
      courseId: parseInt(courseId),
    });

    res.status(201).json(lesson);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'El slug ya existe en este curso' });
    if (err.name === 'SequelizeValidationError')       return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    res.status(500).json({ error: err.message });
  }
});

// ── GET /courses/:courseId/lessons ─────────────────────
router.get('/', async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    const dir = req.query.order === 'DESC' ? 'DESC' : 'ASC';
    const lessons = await Lesson.findAll({
      where: { courseId },
      order: [['order', dir]],
      include: [{ model: Course, as: 'course', attributes: ['id', 'title', 'slug'] }],
    });

    res.json({ total: lessons.length, data: lessons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /lessons/:id ───────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

    const { title, body, order, slug } = req.body;
    await lesson.update({ title, body, order, slug });
    res.json(lesson);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /lessons/:id (soft) ─────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });
    await lesson.destroy();
    res.json({ ok: true, message: 'Lección eliminada (soft delete)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
