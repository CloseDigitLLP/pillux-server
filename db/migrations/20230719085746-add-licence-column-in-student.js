'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      queryInterface.addColumn('students', "licence_id" , { 
        type: Sequelize.INTEGER,
        references:{
          model:"licences",
          key:"id",
        },
        onDelete:"cascade",
        onUpdate:"cascade"
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('students',"licence_id");
  }
};
