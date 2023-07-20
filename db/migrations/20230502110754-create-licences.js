'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('licences', {
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
    },{
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
    const defaultLicences = [{id:1,name:"Permis Boite Manuelle"}, {id:2,name:"Permis Boite Auto"}, {id:3,name:"Permis Moto"}]
    await queryInterface.bulkInsert('licences', defaultLicences, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('licences');
  }
};