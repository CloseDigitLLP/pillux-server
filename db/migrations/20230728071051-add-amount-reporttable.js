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
    await queryInterface.removeColumn('reports', 'comments');
    await queryInterface.addColumn('reports', 'comment', {
      type: Sequelize.TEXT
    })
    await queryInterface.addColumn('reports', 'amount', {
      type: Sequelize.FLOAT
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('reports', 'comments', {
      type: Sequelize.STRING
    })
    await queryInterface.removeColumn('reports', 'comment')
    await queryInterface.removeColumn('reports', 'amount')
  }
};
