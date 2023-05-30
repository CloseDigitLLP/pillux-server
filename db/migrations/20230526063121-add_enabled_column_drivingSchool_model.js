'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('driving_schools', 'enabled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.changeColumn('driving_schools', 'phone', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('driving_schools', 'enabled');
    await queryInterface.changeColumn('driving_schools', 'phone', {
      type: Sequelize.INTEGER,
    });
  }
};
