const createError = require('http-errors');
const { Op } = require('sequelize');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    if (!newuser) {
      return next(createError(400, 'Bad request'));
    }
    const user = newUser.get();
    delete user.password;
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const users = await User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      ...pagination,
      // order: [['email', 'DESC']],
      // limit: 2
      // attributes: ['id', 'email', ['is_male', 'newIsMale']]
      // where: {
      //   id: {
      //     [Op.eq]: 3
      //   }
      // }
    });
    if (users.length === 0) {
      return next(createError(404, 'Users not found'));
    }
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserByPk = async (req, res, next) => {
  try {
    const {
      // params: { idUser },
      userInstance,
    } = req;
    // const user = await User.findByPk(idUser, {
    //   attributes: { exclude: ['password'] },
    // });
    // user.password = undefined;
    const taskCount = await userInstance.countTasks();
    userInstance.dataValues.taskCount = taskCount;
    res.status(200).send({ data: userInstance});
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserStatic = async (req, res, next) => {
  try {
    const {
      body,
      params: { idUser },
    } = req;
    const [, [updatedUser]] = await User.update(body, {
      where: { id: idUser },
      returning: true,
    });
    updatedUser.password = undefined;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    // const userInstance = await User.findByPk(idUser);
    const updatedUser = await userInstance.update(body, {
      returning: true,
    });
    const user = updatedUser.get();
    delete user.password;
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const { userInstance } = req;
    await userInstance.destroy();
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};
