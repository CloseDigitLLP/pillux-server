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
    await queryInterface.changeColumn('students', 'birthday', {
      type: Sequelize.DATE,
      allowNull: true, 
    });
    await queryInterface.changeColumn('students', 'mobile', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('students', 'date_code', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('students', 'birthday', {
      type: Sequelize.STRING, 
      allowNull: true,
    });
    await queryInterface.changeColumn('students', 'mobile', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('students', 'date_code', {
      type: Sequelize.STRING, 
      allowNull: true, 
    });
  }
};
