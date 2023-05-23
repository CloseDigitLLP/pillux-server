'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_group.belongsTo(models.users,{foreignKey:"user_id",as:"userId"})
      user_group.belongsTo(models.group,{foreignKey:"group_id",as:"groupId"})
    }
  }
  user_group.init({
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_group',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return user_group;
};