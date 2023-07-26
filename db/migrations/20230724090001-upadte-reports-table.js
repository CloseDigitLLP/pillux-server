'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('reports', 'type');
    await queryInterface.addColumn('reports', 'type_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'types',
        key: 'id',
      },
      onDelete: 'cascade',
      onDelete: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('reports', 'type_id');
    await queryInterface.addColumn('reports', 'type', {
      type: Sequelize.STRING,
    });
  },
};
