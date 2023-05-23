'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vehicles.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolVehicles"})
      vehicles.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorVehicles"})
      vehicles.hasMany(models.repairs,{foreignKey:"vehicle_id",as:"vehicleRepairs"})
      vehicles.hasMany(models.penalties,{foreignKey:"vehicle_id",as:"vehiclePenalty"})
      vehicles.hasMany(models.report,{foreignKey:"vehicle_id",as:"vehicleReport"})
      vehicles.hasMany(models.repair_document,{foreignKey:"vehicle_id",as:"vehicleReportDoc"})
    }
  }
  vehicles.init({
    name: DataTypes.STRING,
    drivingschool_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    immatriculation: DataTypes.STRING,
    instructor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vehicles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return vehicles;
};