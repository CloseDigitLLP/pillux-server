'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      permission.hasMany(models.user_permissions, {foreignKey: "permission_id", as: "permissionUser"})
    }
  }
  permission.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permission',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return permission;
};