const express = require('express');
const { Comment, Lesson, User } = require('../models');
const parsePagination = require('../utils/pagination');
const asyncHandler = require('../utils/asyncHandler');
const httpError = require('../utils/httpError');

const router = express.Router();

router.post(
  '/lessons/:lessonId/comments',
  asyncHandler(async (req, res) => {
    const lessonId = parseInt(req.params.lessonId, 10);
    const { userId, body } = req.body;

    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) throw httpError(404, 'Lesson not found');

    const user = await User.findByPk(userId);
    if (!user) throw httpError(400, 'userId not found');

    const comment = await Comment.create({ userId, lessonId, body });
    res.status(201).json(comment);
  })
);

router.get(
  '/lessons/:lessonId/comments',
  asyncHandler(async (req, res) => {
    const lessonId = parseInt(req.params.lessonId, 10);
    const { page, pageSize, limit, offset } = parsePagination(req.query);

    const { rows, count } = await Comment.findAndCountAll({
      where: { lessonId },
      include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.json({ total: count, page, pageSize, data: rows });
  })
);

module.exports = router;
