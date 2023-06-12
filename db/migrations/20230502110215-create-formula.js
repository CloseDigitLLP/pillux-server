'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formulas', {
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
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      hour: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      time_validity: {
        type: Sequelize.INTEGER
      },
      time_relance: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('formulas');
  }
};