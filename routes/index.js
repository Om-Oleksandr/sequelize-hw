const { Router } = require('express');
const userRouter = require('./user.router');
const taskRouter = require('./task.router');
const { checkUser } = require('../middlewares/user.mw');
const groupRouter = require('./group.router');
const router = Router();

router.use('/users', userRouter);

router.use('/users/:idUser/tasks', checkUser, taskRouter);


router.use('/groups', groupRouter);

module.exports = router;