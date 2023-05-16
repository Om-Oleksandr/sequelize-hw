const createError = require('http-errors');
const { User } = require('../models');
const NotFoundError = require('../errors/NotFoundError');

module.exports.checkUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
      idUserForTask,
    } = req;
    const id = idUser || idUserForTask;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      // return next(createError(404, 'User not found'));
      return next(new NotFoundError('User not found!!!'));
    }
    user.password = undefined;
    req.userInstance = user;
    next();
  } catch (error) {
    next(error);
  }
};
