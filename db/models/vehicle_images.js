'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vehicle_images.belongsTo(models.vehicles, {foreignKey: 'vehicle_id', as:'vehicleImage'})
    }
  }
  vehicle_images.init({
    vehicle_id: DataTypes.INTEGER,
    path: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicle_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return vehicle_images;
};