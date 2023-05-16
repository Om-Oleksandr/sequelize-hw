const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const TaskController = require('./controllers/task.controller');
const { checkUser } = require('./middlewares/user.mw');
const { checkTask, isUserTask } = require('./middlewares/task.mw');
const {paginate} = require('./middlewares/paginate.mw');
const router = Router();
// http://localhost:3000/users
router.post('/users', UserController.createUser);
router.get('/users', paginate, UserController.getAllUsers);

router.get('/users/:idUser', checkUser, UserController.getUserByPk);

router.put('/users/:idUser/static', UserController.updateUserStatic);
router.put('/users/:idUser/instance', checkUser, UserController.updateUserInstance);

router.delete('/users/:idUser/instance', checkUser, UserController.deleteUserInstance);

router.post('/users/:idUser/tasks', checkUser, TaskController.createTask);
router.get('/users/:idUser/tasks', checkUser, paginate, TaskController.getUserTasks);

router.patch('/users/:idUser/tasks/:idTask', checkUser, checkTask, isUserTask, TaskController.updateTask);
router.delete('/users/:idUser/tasks/:idTask', checkUser, checkTask, isUserTask, TaskController.deleteTask);

router.get('/users/:idUser/tasks/:idTask', checkUser, checkTask, isUserTask, TaskController.getTaskForUser);

router.get('/tasks/:idTask', checkTask, TaskController.getTask);



module.exports = router;
