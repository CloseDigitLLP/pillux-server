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
    await queryInterface.addColumn('driving_schools', 'start_date',{
      type: Sequelize.DATE,
      allowNull: true
    })
    await queryInterface.addColumn('driving_schools', 'valid_date',{
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('driving_schools', 'start_date')
    await queryInterface.removeColumn('driving_schools', 'valid_date')
  }
};
