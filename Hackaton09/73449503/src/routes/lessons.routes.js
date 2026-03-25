const express = require('express');
const { Lesson, Course } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const httpError = require('../utils/httpError');

const router = express.Router();

router.post(
  '/courses/:courseId/lessons',
  asyncHandler(async (req, res) => {
    const courseId = parseInt(req.params.courseId, 10);
    const { title, slug, body } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) {
      throw httpError(404, 'Course not found');
    }

    const maxOrder = await Lesson.max('order', { where: { courseId } });
    const order = Number.isFinite(maxOrder) ? maxOrder + 1 : 1;

    const lesson = await Lesson.create({
      title,
      slug,
      body,
      order,
      courseId
    });

    res.status(201).json(lesson);
  })
);

router.get(
  '/courses/:courseId/lessons',
  asyncHandler(async (req, res) => {
    const courseId = parseInt(req.params.courseId, 10);
    const orderDir = String(req.query.order || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const lessons = await Lesson.findAll({
      where: { courseId },
      order: [['order', orderDir]],
      include: [{ model: Course, as: 'course', attributes: ['id', 'title', 'slug'] }]
    });

    res.json(lessons);
  })
);

router.put(
  '/lessons/:id',
  asyncHandler(async (req, res) => {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      throw httpError(404, 'Lesson not found');
    }

    const { title, slug, body, order } = req.body;
    if (title !== undefined) lesson.title = title;
    if (slug !== undefined) lesson.slug = slug;
    if (body !== undefined) lesson.body = body;
    if (order !== undefined) lesson.order = order;

    await lesson.save();
    res.json(lesson);
  })
);

router.delete(
  '/lessons/:id',
  asyncHandler(async (req, res) => {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      throw httpError(404, 'Lesson not found');
    }
    await lesson.destroy();
    res.status(204).send();
  })
);

module.exports = router;
