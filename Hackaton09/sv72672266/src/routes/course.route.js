const courseController = require('../controllers/course.controller');
const lessonController = require('../controllers/lesson.controller');
const enrollmentController = require('../controllers/enrollment.controller');
const courseRouter = require('express').Router();
const { authMiddleware, requireRole } = require('../middlewares/auth.middleware');

// Courses
courseRouter.post(
    '/',
    authMiddleware,
    requireRole('admin', 'instructor'),
    courseController.createCourse
);
courseRouter.get('/', courseController.getCourses);
courseRouter.get('/:slug', courseController.getCourseBySlug);
courseRouter.put(
    '/:id',
    authMiddleware,
    courseController.updateCourse
);
courseRouter.delete(
    '/:id',
    authMiddleware,
    courseController.deleteCourse
);

// Lessons
courseRouter.post(
    '/:courseId/lessons',
    authMiddleware,
    requireRole('admin', 'instructor'),
    lessonController.createLesson
);
courseRouter.get('/:courseId/lessons', lessonController.getLessonsByCourse);

// Enrollments
courseRouter.post(
    '/:courseId/enroll',
    authMiddleware,
    requireRole('student'),
    enrollmentController.enrollUser
);
courseRouter.get('/:courseId/enrollments', enrollmentController.getEnrollmentsByCourse);

module.exports = { courseRouter };