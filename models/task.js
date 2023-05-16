'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Task.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        allowNull: false,
        defaultValue: false,
        field: 'is_done',
        type: DataTypes.BOOLEAN,
      },
      deadLine: {
        field: 'dead_line',
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(), new Date(value))) {
              throw new Error('check deadLine');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};
