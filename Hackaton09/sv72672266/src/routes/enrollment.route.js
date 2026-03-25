const controller = require('../controllers/enrollment.controller');
const enrollmentRouter = require('express').Router();
const { authMiddleware, requireRole } = require('../middlewares/auth.middleware');

enrollmentRouter.patch(
    '/:id/status',
    authMiddleware,
    controller.updateEnrollmentStatus
);

module.exports = { enrollmentRouter };