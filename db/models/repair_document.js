'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class repair_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      repair_document.belongsTo(models.vehicles,{foreignKey:"vehicle_id",as:"vehicleReportDoc"})
      repair_document.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorRepirsDoc"})
    }
  }
  repair_document.init({
    vehicle_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'repair_document',
  });
  return repair_document;
};