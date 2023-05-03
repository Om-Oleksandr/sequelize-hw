const _ = require('lodash');
const multer = require('multer');
const { Group, User } = require('../models');
const createError = require('http-errors');

const pickBody = (body) => _.pick(body, ['title', 'description', 'imagePath', 'isPrivate']);

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;
    if ('file' in req) {
      body.imagePath = req.file.filename;
    }
    const values = pickBody(body);
    const group = await Group.create(values);

    const user = await User.findByPk(body.userId, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      return next(createError(404, 'user not found'));
    }

    await group.addUser(user);

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.addImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { idGroup },
    } = req;
    const [, [groupUpdated]] = await Group.update(
      { imagePath: filename },
      {
        where: { id: idGroup },
        returning: true,
      }
    );
    res.status(200).send({ data: groupUpdated });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userWithGroups = await User.findByPk(idUser, {
      attributes: {
        exclude: ['password'],
      },
      // include: [Group],
      include: [
        {
          model: Group,
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!userWithGroups) {
      return next(createError(404, 'user not found'));
    }
    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserAtGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      body: { userId },
    } = req;
    const group = await Group.findByPk(idGroup);
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!group) {
      return next(createError(404, 'group not found'));
    }
    if (!user) {
      return next(createError(404, 'user not found'));
    }
    await group.addUser(user);
    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getGroupUsers = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
    } = req;
    const group = await Group.findByPk(idGroup, {
      include: [
        {
          model: User,
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
    if (!group) {
      return next(createError(404, 'group not found'));
    }
    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.updateGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      body,
    } = req;
    if ('file' in req) {
      body.imagePath = req.file.filename;
    }
    const values = pickBody(body);
    const updatedGroup = await Group.update(values, { where: { id: idGroup } });
    res.status(200).send({ data: { updatedGroup } });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
    } = req;
    const deletedGroup = await Group.destroy({ where: { id: idGroup }, returning: true });
    res.status(200).send({ data: deletedGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.countUsers = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
    } = req;
    const group = await Group.findByPk(idGroup);
    const usersAmount = await group.countUsers();
    res.status(200).send({ data: usersAmount });
  } catch (error) {
    next(error);
  }
};
