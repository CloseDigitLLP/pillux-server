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
      penalties.belongsTo(models.vehicles,{foreignKey:"vehicle_id",as:"vehiclePenalty"})
      penalties.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorPenalty"})
      penalties.hasMany(models.penalty_document,{foreignKey:"penalty_id",as:"penaltyId"})
    }
  }
  penalties.init({
    vehicle_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'penalties',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return penalties;
};