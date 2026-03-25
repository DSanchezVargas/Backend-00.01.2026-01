const { Lesson, Course, sequelize } = require('../models');
const { Op } = require('sequelize');

// Helper
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

exports.createLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, body } = req.body;
    const user = req.user;

    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Solo owner o admin
    if (user.role !== 'admin' && course.ownerId !== user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    // Obtener último order
    const maxOrder = await Lesson.max('order', {
      where: { courseId }
    });

    const nextOrder = (maxOrder || 0) + 1;

    const lesson = await Lesson.create({
      title,
      slug: slugify(title),
      body,
      order: nextOrder,
      courseId
    });

    return res.status(201).json(lesson);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando lección' });
  }
};

exports.getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { order = 'ASC' } = req.query;

    const direction = order === 'DESC' ? 'DESC' : 'ASC';

    const lessons = await Lesson.findAll({
      where: { courseId },
      order: [['order', direction]],
      include: [
        {
          model: Course,
          attributes: ['id', 'title', 'slug']
        }
      ]
    });

    return res.json(lessons);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo lecciones' });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, order } = req.body;
    const user = req.user;

    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lección no encontrada' });
    }

    const course = await Course.findByPk(lesson.courseId);

    // Solo owner o admin
    if (user.role !== 'admin' && course.ownerId !== user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    if (title) {
      lesson.title = title;
      lesson.slug = slugify(title);
    }

    if (body !== undefined) {
      lesson.body = body;
    }

    if (order !== undefined) {
      lesson.order = order;
    }

    await lesson.save();

    return res.json(lesson);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando lección' });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lección no encontrada' });
    }

    const course = await Course.findByPk(lesson.courseId);

    // Solo owner o admin
    if (user.role !== 'admin' && course.ownerId !== user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await lesson.destroy(); // soft delete

    return res.json({ message: 'Lección eliminada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando lección' });
  }
};

