const controller = require('../controllers/user.controller');
const userRouter = require('express').Router();

userRouter.post('/', controller.addUser);
userRouter.get('/', controller.getUsers);

module.exports = { userRouter };