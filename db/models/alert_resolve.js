'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alert_resolve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      alert_resolve.belongsTo(models.alerts,{foreignKey:"alert_id",as:"alertId",onDelete: "CASCADE", onUpdate: "CASCADE"})
      alert_resolve.belongsTo(models.planning_secretarys,{foreignKey:"secretary_id",as:"secretaryAlert",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  alert_resolve.init({
    alert_id: DataTypes.INTEGER,
    secretary_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'alert_resolves',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  return alert_resolve;
};