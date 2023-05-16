const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const { checkTask, isUserTask } = require('../middlewares/task.mw');
const { paginate } = require('../middlewares/paginate.mw');
const taskRouter = Router();

taskRouter.route('/').post(TaskController.createTask).get(paginate, TaskController.getUserTasks);

taskRouter
  .route('/:idTask')
  .patch(checkTask, isUserTask, TaskController.updateTask)
  .delete(checkTask, isUserTask, TaskController.deleteTask)
  .get(checkTask, isUserTask, TaskController.getTaskForUser);
module.exports = taskRouter;
