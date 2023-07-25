'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penalties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      penalties.belongsTo(models.vehicles,{foreignKey:"vehicle_id",as:"vehiclePenalty",onDelete: "CASCADE", onUpdate: "CASCADE"})
      penalties.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorPenalty",onDelete: "CASCADE", onUpdate: "CASCADE"})
      penalties.hasOne(models.penalty_document,{foreignKey:"penalty_id",as:"penaltyDocs",onDelete: "CASCADE", onUpdate: "CASCADE"})
      penalties.belongsTo(models.types, {foreignKey: 'type_id', as: 'penaltyType', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    }
  }
  penalties.init({
    vehicle_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    comment: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'penalties',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return penalties;
};