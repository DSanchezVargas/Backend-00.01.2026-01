// src/routes/courses.routes.js
const router = require('express').Router();
const { Course, User, Lesson, Enrollment, Op } = require('../models');

function paginate(req) {
  const page     = Math.max(1, parseInt(req.query.page     || '1'));
  const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize || '10')));
  return { limit: pageSize, offset: (page - 1) * pageSize, page, pageSize };
}

function parseOrder(raw) {
  if (!raw) return [['createdAt', 'DESC']];
  const [field, dir] = raw.split(':');
  const allowed = ['createdAt', 'updatedAt', 'title', 'studentsCount'];
  if (!allowed.includes(field)) return [['createdAt', 'DESC']];
  return [[field, dir === 'ASC' ? 'ASC' : 'DESC']];
}

// ── POST /courses ──────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { title, description, ownerId, published } = req.body;
    if (!ownerId) return res.status(400).json({ error: 'ownerId es requerido' });

    const owner = await User.findByPk(ownerId);
    if (!owner) return res.status(404).json({ error: 'Instructor no encontrado' });
    if (!['instructor', 'admin'].includes(owner.role)) {
      return res.status(403).json({ error: 'El usuario debe ser instructor o admin' });
    }

    const course = await Course.create({ title, description, ownerId, published: published ?? false });
    res.status(201).json(course);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'El título o slug ya existe' });
    if (err.name === 'SequelizeValidationError')       return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    res.status(500).json({ error: err.message });
  }
});

// ── GET /courses ───────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { limit, offset, page, pageSize } = paginate(req);
    const { published, q, order, createdAt_gte, createdAt_lte } = req.query;

    const where = {};
    if (published !== undefined) where.published = published === 'true';
    if (q) where.title = { [Op.like]: `%${q.trim()}%` };
    if (createdAt_gte || createdAt_lte) {
      where.createdAt = {};
      if (createdAt_gte) where.createdAt[Op.gte] = new Date(createdAt_gte);
      if (createdAt_lte) where.createdAt[Op.lte] = new Date(createdAt_lte);
    }

    const { rows, count } = await Course.findAndCountAll({
      where,
      include: [{ model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName'] }],
      order: parseOrder(order),
      limit,
      offset,
      distinct: true,
    });

    res.json({ total: count, page, pageSize, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /courses/:slug ─────────────────────────────────
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName', 'email'] },
        /*{ model: Lesson, as: 'lessons', attributes: ['id', 'title', 'slug', 'order'], where: { deletedAt: null }, required: false, order: [['order', 'ASC']] },*/
        { model: Lesson, as: 'lessons', attributes: ['id', 'title', 'slug', 'order'], required: false},
      ],
    });
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    const studentsCount = await Enrollment.count({ where: { courseId: course.id, status: 'active' } });

    res.json({
      ...course.toJSON(),
      stats: { lessonsCount: course.lessons.length, studentsCount },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /courses/:id ───────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });

    const { title, description, published, slug } = req.body;
    await course.update({ title, description, published, slug });
    res.json(course);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'El título o slug ya existe' });
    if (err.name === 'SequelizeValidationError')       return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /courses/:id (soft delete) ─────────────────
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, { paranoid: false });
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
    await course.destroy(); // paranoid → solo pone deletedAt
    res.json({ ok: true, message: 'Curso eliminado (soft delete)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /courses/:id/restore ──────────────────────────
router.post('/:id/restore', async (req, res) => {
  try {
    const course = await Course.findOne({ where: { id: req.params.id }, paranoid: false });
    if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
    await course.restore();
    res.json({ ok: true, data: course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
