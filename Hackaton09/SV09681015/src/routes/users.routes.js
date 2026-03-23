// src/routes/users.routes.js
const router = require('express').Router();
const { User, Op } = require('../models');

// ── Helpers ────────────────────────────────────────────
function paginate(req) {
  const page     = Math.max(1, parseInt(req.query.page     || '1'));
  const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize || '10')));
  return { limit: pageSize, offset: (page - 1) * pageSize, page, pageSize };
}

// ── POST /users ────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!password) return res.status(400).json({ error: 'password es requerido' });

    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash: password, // En producción: bcrypt.hash(password, 10)
      role,
    });

    const { passwordHash: _, ...data } = user.toJSON();
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: err.errors.map(e => e.message).join(', ') });
    }
    res.status(500).json({ error: err.message });
  }
});

// ── GET /users ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { limit, offset, page, pageSize } = paginate(req);
    const { role, q } = req.query;

    const where = {};
    if (role) where.role = role;
    if (q) {
      const like = { [Op.like]: `%${q.trim()}%` };
      where[Op.or] = [{ firstName: like }, { lastName: like }, { email: like }];
    }

    const { rows, count } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['passwordHash'] },
      order: [['lastName', 'ASC'], ['firstName', 'ASC']],
      limit,
      offset,
    });

    res.json({ total: count, page, pageSize, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /users/:id ─────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['passwordHash'] },
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
