'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_formulas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      formula_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"formulas",
          key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      quantity: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('student_formulas');
  }
};