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

    await queryInterface.addColumn('student_formulas', 'installments', {
      type: Sequelize.INTEGER
    })

    await queryInterface.addColumn('student_formulas', 'first_installment_hours', {
      type: Sequelize.INTEGER
    })

    await queryInterface.addColumn('student_formulas', 'second_installment_hours', {
      type: Sequelize.INTEGER
    })

    await queryInterface.addColumn('student_formulas', 'third_installment_hours', {
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

    await queryInterface.removeColumn('student_formulas', 'installments')
    await queryInterface.removeColumn('student_formulas', 'first_installment_hours')
    await queryInterface.removeColumn('student_formulas', 'second_installment_hours')
    await queryInterface.removeColumn('student_formulas', 'third_installment_hours')


  }
};
