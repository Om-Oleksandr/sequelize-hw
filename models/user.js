'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId',
      });
      User.belongsToMany(models.Group, {
        through: 'users_to_groups',
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      firstName: {
        allowNull: false,
        field: 'first_name',
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        allowNull: false,
        field: 'last_name',
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue('password', 'hash');
        },
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('check birthday');
            }
          },
        },
      },
      isMale: {
        field: 'is_male',
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
