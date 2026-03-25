const { Enrollment, Course, User } = require('../models');

exports.enrollUser = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body;

    // si no mandan userId, entonces usar el del token
    const finalUserId = userId || req.user.id;

    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const user = await User.findByPk(finalUserId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Evitar duplicados
    const existing = await Enrollment.findOne({
      where: { userId: finalUserId, courseId }
    });

    if (existing) {
      return res.status(400).json({ message: 'Ya está inscrito en este curso' });
    }

    const enrollment = await Enrollment.create({
      userId: finalUserId,
      courseId,
      status: 'pending'
    });

    return res.status(201).json(enrollment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inscribiendo usuario' });
  }
};

exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, score } = req.body;
    const user = req.user;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment no encontrado' });
    }

    const course = await Course.findByPk(enrollment.courseId);

    // Solo admin o owner
    if (user.role !== 'admin' && course.ownerId !== user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    // Validar status permitido
    if (status && !['pending', 'active'].includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    if (status) enrollment.status = status;
    if (score !== undefined) enrollment.score = score;

    await enrollment.save();

    return res.json(enrollment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando enrollment' });
  }
};

exports.getEnrollmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { status } = req.query;

    const where = { courseId };

    if (status) {
      where.status = status;
    }

    const enrollments = await Enrollment.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.json(enrollments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo enrollments' });
  }
};
