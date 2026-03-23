// src/routes/comments.routes.js
const router = require('express').Router({ mergeParams: true });
const { Comment, Lesson, User } = require('../models');

function paginate(req) {
  const page     = Math.max(1, parseInt(req.query.page     || '1'));
  const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize || '10')));
  return { limit: pageSize, offset: (page - 1) * pageSize, page, pageSize };
}

// ── POST /lessons/:lessonId/comments ──────────────────
router.post('/', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { body, userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId es requerido' });

    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const comment = await Comment.create({ body, userId, lessonId: parseInt(lessonId) });

    // Eager load del author para la respuesta
    const full = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] }],
    });
    res.status(201).json(full);
  } catch (err) {
    if (err.message.includes('al menos 3')) return res.status(400).json({ error: err.message });
    if (err.name === 'SequelizeValidationError')  return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    res.status(500).json({ error: err.message });
  }
});

// ── GET /lessons/:lessonId/comments ───────────────────
router.get('/', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { limit, offset, page, pageSize } = paginate(req);

    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' });

    const { rows, count } = await Comment.findAndCountAll({
      where: { lessonId },
      include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    res.json({ total: count, page, pageSize, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
