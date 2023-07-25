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
      alerts.belongsTo(models.students,{foreignKey:"student_id",as:"studentAlerts",onDelete: "CASCADE", onUpdate: "CASCADE"})
      alerts.hasOne(models.alert_resolve,{foreignKey:"alert_id",as:"alertId",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  alerts.init({
    student_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    resume: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'alerts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return alerts;
};