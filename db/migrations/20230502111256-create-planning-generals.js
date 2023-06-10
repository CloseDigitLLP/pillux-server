'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('planning_generals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      drivingschool_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"driving_schools",
          key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      student_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"students",
          key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      secretary_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'planning_secretarys',
          key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      instructor_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      start_horary: {
        type: Sequelize.DATE
      },
      end_horary: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      gearbox: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      },
      motif: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    },{
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('planning_generals');
  }
};