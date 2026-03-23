// src/routes/enrollments.routes.js
const router = require('express').Router({ mergeParams: true });
const { sequelize, Enrollment, Course, User } = require('../models');

// ── POST /courses/:courseId/enroll ─────────────────────
// Transacción: crear Enrollment, activarlo e incrementar studentsCount
router.post('/', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { courseId } = req.params;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId es requerido' });

    const course = await Course.findByPk(courseId, { transaction: t });
    if (!course) { await t.rollback(); return res.status(404).json({ error: 'Curso no encontrado' }); }

    const user = await User.findByPk(userId, { transaction: t });
    if (!user) { await t.rollback(); return res.status(404).json({ error: 'Usuario no encontrado' }); }

    // Evitar doble inscripción
    const existing = await Enrollment.findOne({ where: { userId, courseId }, transaction: t });
    if (existing) { await t.rollback(); return res.status(409).json({ error: 'El usuario ya está inscrito en este curso' }); }

    // 1) Crear inscripción en pending
    const enrollment = await Enrollment.create(
      { userId, courseId, status: 'pending' },
      { transaction: t }
    );

    // 2) Activar inmediatamente (demostración de la transacción compuesta)
    await enrollment.update({ status: 'active' }, { transaction: t });

    // 3) Incrementar contador en Course
    await Course.increment('studentsCount', { by: 1, where: { id: courseId }, transaction: t });

    await t.commit();
    res.status(201).json({ ok: true, enrollment });
  } catch (err) {
    await t.rollback();
    if (err.name === 'SequelizeValidationError') return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    res.status(500).json({ error: err.message });
  }
});

// ── GET /courses/:courseId/enrollments ─────────────────
router.get('/', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { status } = req.query;

    const where = { courseId };
    if (status) where.status = status;

    const enrollments = await Enrollment.findAll({
      where,
      include: [{ model: User, as: 'student', attributes: ['id', 'firstName', 'lastName', 'email', 'role'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json({ total: enrollments.length, data: enrollments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PATCH /enrollments/:id/status ─────────────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) return res.status(404).json({ error: 'Inscripción no encontrada' });

    const { status, score } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (score  !== undefined) updates.score = score;

    await enrollment.update(updates);
    res.json(enrollment);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
