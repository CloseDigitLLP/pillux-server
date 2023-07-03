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
    await queryInterface.addColumn('planning_exams', 'exam_id', { 
      type: Sequelize.INTEGER,
      references:{
        model:"exams",
        key:"id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
     });

     await queryInterface.removeColumn('planning_exams', 'date_start')
     await queryInterface.removeColumn('planning_exams', 'date_end')
     await queryInterface.removeColumn('planning_exams', 'drivingschool_id')

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('exams', 'exam_id');

    await queryInterface.addColumn('planning_exams', 'drivingschool_id', {
      type: Sequelize.INTEGER,
      references:{
        model:"driving_schools",
        key:"id"
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })

    await queryInterface.addColumn('planning_exams', 'date_start', {
      type: Sequelize.DATE
    })

    await queryInterface.addColumn('planning_exams', 'date_end', {
      type: Sequelize.DATE
    })

  }
};
