'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:"id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      group_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"groups",
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
    await queryInterface.dropTable('user_groups');
  }
};