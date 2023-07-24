'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      subtype: {
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
      { type: 'amendes', subtype: 'Amendes de stationnement '},
      { type: 'amendes', subtype: 'Amendes pour excès de vitesse '},
      { type: 'amendes', subtype: 'Amendes pour non-respect des feux de signalisation '},
      { type: 'amendes', subtype: "Amendes pour conduite sous l'influence de l'alcool ou de drogues  "},
      { type: 'amendes', subtype: "Amendes pour non-port de la ceinture de sécurité "},
      { type: 'amendes', subtype: 'Amendes pour utilisation du téléphone portable au volant'},
      { type: 'amendes', subtype: 'Amendes pour défaut de contrôle technique'},
      { type: 'amendes', subtype: 'Amendes pour non-respect des règles de priorité'},
      { type: 'amendes', subtype: "Amendes pour défaut d'assurance automobile"},
      { type: 'amendes', subtype: "Amendes pour pollution excessive"},
      { type: 'réparation', subtype: "Mécanique"},
      { type: 'réparation', subtype: "Carrosserie"},
      { type: 'réparation', subtype: "Entretien"},
      { type: 'réparation', subtype: "Électronique"},
      { type: 'réparation', subtype: "Pneumatiques"},
      { type: 'accident', subtype: "Accrochage"},
      { type: 'accident', subtype: "Collision avec un autre véhicule"},
      { type: 'accident', subtype: "Accidents de la route seul "},
      { type: 'accident', subtype: "Accident avec piéton"},
      { type: 'accident', subtype: "Accident avec objet fixe"},
    ]

    await queryInterface.bulkInsert('types', defaultTypes, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('types');
  }
};