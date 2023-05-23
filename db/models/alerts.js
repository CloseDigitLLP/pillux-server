'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      alerts.belongsTo(models.students,{foreignKey:"student_id",as:"studentAlerts"})
      alerts.hasOne(models.alert_resolve,{foreignKey:"alert_id",as:"alertId"})
    }
  }
  alerts.init({
    student_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    resume: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'alerts',
  });
  return alerts;
};