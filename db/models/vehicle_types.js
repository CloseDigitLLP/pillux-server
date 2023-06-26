'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vehicle_types.hasMany(models.vehicles,{foreignKey:"type_id",as:"VehicleTypes",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  vehicle_types.init({
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'vehicle_types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return vehicle_types;
};