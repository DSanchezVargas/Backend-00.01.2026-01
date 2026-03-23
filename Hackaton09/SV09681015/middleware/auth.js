// middleware/auth.js  (temporal, sin JWT)
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'x-user-id requerido' });

  const user = await User.findByPk(userId);
  if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

  req.user = user;
  next();
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Sin permisos' });
  }
  next();
};

module.exports = { authenticate, requireRole };