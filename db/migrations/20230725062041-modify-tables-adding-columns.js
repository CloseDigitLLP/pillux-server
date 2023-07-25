'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('comments', 'comment', {
      type: Sequelize.TEXT
    })
    await queryInterface.addColumn('reports', 'date', {
      type: Sequelize.DATE
    })
    await queryInterface.addColumn('repairs', 'date', {
      type: Sequelize.DATE
    })
    await queryInterface.addColumn('penalties', 'date', {
      type: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('comments', 'comment', {
      type: Sequelize.STRING
    })
    await queryInterface.removeColumn('reports', 'date')
    await queryInterface.removeColumn('repairs', 'date')
    await queryInterface.removeColumn('penalties', 'date')
  }
};
