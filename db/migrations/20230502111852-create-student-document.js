'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_documents', {
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
      type: {
        type: Sequelize.STRING
      },
      document_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"documents",
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
    await queryInterface.dropTable('student_documents');
  }
};