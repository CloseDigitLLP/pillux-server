'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      report.belongsTo(models.vehicles,{foreignKey:"vehicle_id",as:"vehicleReport"})
      report.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorReport"})
      report.hasMany(models.report_document,{foreignKey:"report_id",as:"reportId"})
    }
  }
  report.init({
    vehicle_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reports',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return report;
};