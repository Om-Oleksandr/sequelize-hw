'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: 'users_to_groups',
        foreignKey: 'groupId',
      });
    }
  }
  Group.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      description: DataTypes.STRING,
      imagePath: {
        field: 'image_path',
        type: DataTypes.TEXT,
      },
      isPrivate: {
        allowNull: false,
        defaultValue: false,
        field: 'is_private',
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      underscored: true,
    }
  );
  return Group;
};
