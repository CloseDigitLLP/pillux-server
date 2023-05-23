'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    });
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING,
      validate: {
        len: [8, 255]
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING
    });

  }
};
