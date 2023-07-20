'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('debits', 'date', {
      type: Sequelize.DATE,
    });
    await queryInterface.changeColumn('debits', 'status', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('debits', 'date');
    await queryInterface.changeColumn('debits', 'status', {
      type: Sequelize.STRING,
    });
  },
};