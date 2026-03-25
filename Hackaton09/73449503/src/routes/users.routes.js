const express = require('express');
const { Op } = require('sequelize');
const { User } = require('../models');
const parsePagination = require('../utils/pagination');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, passwordHash, role } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: role || 'student'
    });

    const data = user.toJSON();
    delete data.passwordHash;
    res.status(201).json(data);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page, pageSize, limit, offset } = parsePagination(req.query);
    const q = (req.query.q || '').trim();
    const role = req.query.role;

    const where = {};
    if (role) {
      where.role = role;
    }

    if (q) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${q}%` } },
        { lastName: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } }
      ];
    }

    const { rows, count } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['passwordHash'] },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({ total: count, page, pageSize, data: rows });
  })
);

module.exports = router;
