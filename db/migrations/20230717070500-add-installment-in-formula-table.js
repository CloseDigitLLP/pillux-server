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
    await queryInterface.addColumn('formulas','installments', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('formulas','first_installment_hours', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('formulas','second_installment_hours', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('formulas','third_installment_hours', {
      type: Sequelize.INTEGER
    })
    await queryInterface.removeColumn('formulas','type');
    await queryInterface.removeColumn('formulas','time_relance');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('formulas', 'installments')
    await queryInterface.removeColumn('formulas', 'first_installment_hours')
    await queryInterface.removeColumn('formulas', 'second_installment_hours')
    await queryInterface.removeColumn('formulas', 'third_installment_hours')

    await queryInterface.addColumn('formulas','type',{
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('formulas','time_relance',{
      type: Sequelize.INTEGER
    });
  }
};
