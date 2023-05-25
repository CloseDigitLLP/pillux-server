'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class repairs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      repairs.belongsTo(models.vehicles,{foreignKey:"vehicle_id",as:"vehicleRepairs"})
      repairs.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorRepairs"})
    }
  }
  repairs.init({
    vehicle_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'repairs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return repairs;
};