'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photo_id: {
        type: Sequelize.STRING,
        allowNull:true
      },
      username: {
        type: Sequelize.STRING
      },
      username_canonical: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      email_canonical: {
        type: Sequelize.STRING
      },
      enabled: {
        type: Sequelize.BOOLEAN
      },
      salt: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      last_login: {
        type: Sequelize.DATE
      },
      confirmation_token: {
        type: Sequelize.STRING
      },
      password_requested_at: {
        type: Sequelize.DATE
      },
      role_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'roles',
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
    await queryInterface.sequelize.query('CREATE TRIGGER hash_password BEFORE INSERT ON users FOR EACH ROW SET new.password = MD5(new.password);')

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query('DROP TRIGGER hash_password');
  }
};