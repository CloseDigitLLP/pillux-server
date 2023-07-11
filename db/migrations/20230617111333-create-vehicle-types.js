'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicle_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    const defaultTypes = [
      { type: "transmission automatique de voiture" },
      { type: "transmission manuelle de voiture" },
      { type: "moto" }
    ]
    await queryInterface.bulkInsert('vehicle_types', defaultTypes, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicle_types');
  }
};