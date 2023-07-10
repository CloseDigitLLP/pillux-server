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
    await queryInterface.removeColumn('student_formulas', 'secretary_id');

    await queryInterface.addColumn('student_formulas', 'secretary_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) { 
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('student_formulas', 'secretary_id');

    await queryInterface.addColumn('student_formulas', 'secretary_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'planning_secretarys', 
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  }
};
