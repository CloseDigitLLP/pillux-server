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
    await queryInterface.removeColumn('vehicles', 'type');

    await queryInterface.addColumn('vehicles', 'type_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'vehicle_types',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addColumn('vehicles', 'date', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('vehicles', 'type', {
      type: Sequelize.STRING,
      allowNull: true
    })
    await queryInterface.removeColumn('vehicles', 'type_id');
    await queryInterface.removeColumn('vehicles', 'date');
  }
};
