'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    email: DataTypes.STRING,
    monthly_spent_limit: DataTypes.INTEGER,
    daily_calories_threshold: DataTypes.INTEGER,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return users;
};