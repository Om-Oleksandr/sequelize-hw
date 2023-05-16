'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        field: 'first_name',
        type: Sequelize.STRING(64)
      },
      lastName: {
        allowNull: false,
        field: 'last_name',
        type: Sequelize.STRING(64)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128)
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: Sequelize.TEXT
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      isMale: {
        field: 'is_male',
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};