const express = require('express');
const { sequelize, Enrollment, Course, User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const httpError = require('../utils/httpError');

const router = express.Router();

router.post(
  '/courses/:courseId/enroll',
  asyncHandler(async (req, res) => {
    const courseId = parseInt(req.params.courseId, 10);
    const { userId } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) throw httpError(404, 'Course not found');

    const user = await User.findByPk(userId);
    if (!user) throw httpError(400, 'userId not found');

    const t = await sequelize.transaction();
    try {
      const existing = await Enrollment.findOne({ where: { courseId, userId }, transaction: t });
      if (existing) {
        throw httpError(409, 'User already enrolled');
      }

      const enrollment = await Enrollment.create(
        { courseId, userId, status: 'pending' },
        { transaction: t }
      );

      await enrollment.update({ status: 'active' }, { transaction: t });

      await Course.increment('studentsCount', {
        by: 1,
        where: { id: courseId },
        transaction: t
      });

      await t.commit();
      res.status(201).json(enrollment);
    } catch (err) {
      await t.rollback();
      throw err;
    }
  })
);

router.patch(
  '/enrollments/:id/status',
  asyncHandler(async (req, res) => {
    const { status, score } = req.body;
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) throw httpError(404, 'Enrollment not found');

    const t = await sequelize.transaction();
    try {
      const wasActive = enrollment.status === 'active';
      if (status) enrollment.status = status;
      if (score !== undefined) enrollment.score = score;
      await enrollment.save({ transaction: t });

      if (!wasActive && enrollment.status === 'active') {
        await Course.increment('studentsCount', {
          by: 1,
          where: { id: enrollment.courseId },
          transaction: t
        });
      }

      await t.commit();
      res.json(enrollment);
    } catch (err) {
      await t.rollback();
      throw err;
    }
  })
);

router.get(
  '/courses/:courseId/enrollments',
  asyncHandler(async (req, res) => {
    const courseId = parseInt(req.params.courseId, 10);
    const status = req.query.status;

    const where = { courseId };
    if (status) where.status = status;

    const enrollments = await Enrollment.findAll({
      where,
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(enrollments);
  })
);

module.exports = router;
