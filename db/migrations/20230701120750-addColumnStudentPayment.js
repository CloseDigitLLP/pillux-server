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
    await queryInterface.removeColumn('student_payments', 'mode');
    await queryInterface.addColumn('student_payments', 'type', {
      type: Sequelize.ENUM("1er versement", "2eme versement", "3eme versement", "versement"),
    });
    await queryInterface.addColumn('student_payments', 'mode', {
      type: Sequelize.ENUM("Virement", "Chèque", "Espéces", "Chéque à encaissement programmé", "Chéque de caution"),
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('student_payments', 'type');
    await queryInterface.removeColumn('student_payments', 'mode')
    await queryInterface.addColumn('student_payments', 'mode', {
      type: Sequelize.STRING
    })
  }
};
