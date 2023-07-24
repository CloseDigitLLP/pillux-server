'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      types.hasMany(models.penalties, {foreignKey: 'type_id', as: 'penaltyType', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      types.hasMany(models.repairs, {foreignKey: 'type_id', as: 'repairType', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
      types.hasMany(models.report, {foreignKey: 'type_id', as: 'reportType', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  types.init({
    type: DataTypes.STRING,
    subtype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return types;
};