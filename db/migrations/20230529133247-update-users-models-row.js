'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'username', 'firstname')
    await queryInterface.renameColumn('users', 'username_canonical', 'lastname')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'firstname', 'username')
    await queryInterface.renameColumn('users', 'lastname', 'username_canonical')
  }
};
