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
    await queryInterface.changeColumn('formulas', "status", {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })

    await queryInterface.bulkUpdate('formulas', { status: true }, {
      status: null,
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('formulas', "status", {
      type: Sequelize.STRING,
      defaultValue: null
    })
  }
};
