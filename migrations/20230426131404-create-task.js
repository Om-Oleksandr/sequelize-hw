'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        field: 'user_id',
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'restrict',
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isDone: {
        allowNull: false,
        defaultValue: false,
        field: 'is_done',
        type: Sequelize.BOOLEAN,
      },
      deadLine: {
        field: 'dead_line',
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  },
};
