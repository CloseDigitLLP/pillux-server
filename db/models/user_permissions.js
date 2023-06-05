'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_permissions.belongsTo(models.users, {foreignKey: "user_id",as: "userPermissions"})
      user_permissions.belongsTo(models.permission, {foreignKey: "permission_id", as: "permissionUser"})
    }
  }
  user_permissions.init({
    user_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_permissions',
    tableName: 'user_permissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return user_permissions;
};