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
    await queryInterface.changeColumn('student_payments', 'numberbankcheck', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('student_payments', 'student_id', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('student_payments', 'formula_id', {
      type: Sequelize.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('student_payments', 'numberbankcheck', {
      type: Sequelize.INTEGER
    })
    await queryInterface.removeColumn('student_payments', 'student_id')
    await queryInterface.removeColumn('student_payments', 'formula_id')
  }
};
