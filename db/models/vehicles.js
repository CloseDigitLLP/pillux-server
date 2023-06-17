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
      vehicles.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorVehicles",onDelete: "CASCADE", onUpdate: "CASCADE"})
      vehicles.belongsTo(models.vehicle_types,{foreignKey:"type_id",as:"VehicleTypes",onDelete: "CASCADE", onUpdate: "CASCADE"})
      vehicles.hasMany(models.repairs,{foreignKey:"vehicle_id",as:"vehicleRepairs",onDelete: "CASCADE", onUpdate: "CASCADE"})
      vehicles.hasMany(models.penalties,{foreignKey:"vehicle_id",as:"vehiclePenalty",onDelete: "CASCADE", onUpdate: "CASCADE"})
      vehicles.hasMany(models.report,{foreignKey:"vehicle_id",as:"vehicleReport",onDelete: "CASCADE", onUpdate: "CASCADE"})
      vehicles.hasMany(models.repair_document,{foreignKey:"vehicle_id",as:"vehicleReportDoc",onDelete: "CASCADE", onUpdate: "CASCADE"})
      vehicles.hasMany(models.vehicle_images, {foreignKey: 'vehicle_id',as:'vehicleImage',onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  vehicles.init({
    name: DataTypes.STRING,
    drivingschool_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    immatriculation: DataTypes.STRING,
    instructor_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'vehicles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return vehicles;
};