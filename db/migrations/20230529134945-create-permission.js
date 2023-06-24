'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    },{
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });

    const defaultPermissions = [
      { type: "Peut voir la page des recettes"},
      { type: "Peut voir la page des réglages"},
      { type: "Peut voir la page des examens"},
      { type: "Peut supprimer des prestations éléves"},
      { type: "Peut supprimer des encaissements"},
      { type: "Peut supprimer des heures"},
    ]
    await queryInterface.bulkInsert('permissions', defaultPermissions, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions');
  }
};