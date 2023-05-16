const LimitTasksError = require('../errors/LimitTasksError');
const { Task } = require('../models');

// module.exports.createTask = async (req, res, next) => {
//   try {
//     const {
//       params: { idUser },
//       body,
//     } = req;
//     const newTask = await Task.create({ ...body, userId: idUser });
//     res.status(201).send({ data: newTask });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.createTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;

    const countTask = await userInstance.countTasks();
    
    if (countTask >= 5) {
      return next(new LimitTasksError('tasks must be less than 5'));
    }

    const task = await userInstance.createTask(body);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, pagination = {} } = req;
    const tasks = await userInstance.getTasks(pagination);
    if (tasks.length === 0) {
      return res.status(204).send();
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { taskInstance, body } = req;
    const updatedTask = await taskInstance.update(body);
    res.status(200).send(updatedTask);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.getTaskForUser = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      params: { idTask },
    } = req;
    const task = await Task.findByPk(idTask);
    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};
