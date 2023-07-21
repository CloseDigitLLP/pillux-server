'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
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
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });

    const defaultRoles = [
      { id: 1, name: 'Moniteurs' },
      { id: 2, name: 'Secrétaires' },
      { id: 3, name: 'Gérants' }
    ];

    await queryInterface.bulkInsert('roles', defaultRoles, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};