const express = require('express');
const { Op } = require('sequelize');
const { Course, User, Lesson, Enrollment } = require('../models');
const parsePagination = require('../utils/pagination');
const asyncHandler = require('../utils/asyncHandler');
const httpError = require('../utils/httpError');

const router = express.Router();

function parseOrderParam(raw) {
  if (!raw) return [['createdAt', 'DESC']];
  const [field, direction] = raw.split(':');
  const dir = String(direction || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  const allowed = new Set(['createdAt', 'title', 'published']);
  if (!allowed.has(field)) {
    return [['createdAt', 'DESC']];
  }
  return [[field, dir]];
}

function parseBool(raw) {
  if (raw === undefined) return undefined;
  if (raw === 'true' || raw === '1') return true;
  if (raw === 'false' || raw === '0') return false;
  return undefined;
}

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, slug, description, published, ownerId } = req.body;

    const owner = await User.findByPk(ownerId);
    if (!owner) {
      throw httpError(400, 'ownerId not found');
    }
    if (!['admin', 'instructor'].includes(owner.role)) {
      throw httpError(400, 'owner must be admin or instructor');
    }

    const course = await Course.create({
      title,
      slug,
      description,
      published: published ?? false,
      ownerId
    });

    res.status(201).json(course);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page, pageSize, limit, offset } = parsePagination(req.query);
    const q = (req.query.q || '').trim();
    const published = parseBool(req.query.published);
    const order = parseOrderParam(req.query.order);

    const where = {};
    if (q) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } }
      ];
    }
    if (published !== undefined) {
      where.published = published;
    }

    const { rows, count } = await Course.findAndCountAll({
      where,
      order,
      limit,
      offset,
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName'] }
      ]
    });

    res.json({ total: count, page, pageSize, data: rows });
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const course = await Course.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Lesson, as: 'lessons', attributes: ['id', 'title', 'slug', 'order'] }
      ],
      order: [[{ model: Lesson, as: 'lessons' }, 'order', 'ASC']]
    });

    if (!course) {
      throw httpError(404, 'Course not found');
    }

    const studentsCount = await Enrollment.count({
      where: { courseId: course.id, status: 'active' }
    });

    res.json({
      ...course.toJSON(),
      stats: { lessonsCount: course.lessons.length, studentsCount }
    });
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      throw httpError(404, 'Course not found');
    }

    const { title, slug, description, published, ownerId } = req.body;

    if (ownerId !== undefined) {
      const owner = await User.findByPk(ownerId);
      if (!owner) {
        throw httpError(400, 'ownerId not found');
      }
      if (!['admin', 'instructor'].includes(owner.role)) {
        throw httpError(400, 'owner must be admin or instructor');
      }
      course.ownerId = ownerId;
    }

    if (title !== undefined) {
      course.title = title;
      if (slug === undefined) {
        course.slug = null;
      }
    }
    if (slug !== undefined) course.slug = slug;
    if (description !== undefined) course.description = description;
    if (published !== undefined) course.published = published;

    await course.save();

    res.json(course);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      throw httpError(404, 'Course not found');
    }
    await course.destroy();
    res.status(204).send();
  })
);

module.exports = router;
