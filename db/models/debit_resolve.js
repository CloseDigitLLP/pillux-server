'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class debit_resolve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      debit_resolve.belongsTo(models.debit,{foreignKey:"debit_id",as:"debitId"})
      debit_resolve.belongsTo(models.planning_secretarys,{foreignKey:"secretary_id",as:"secretaryDebit"})
    }
  }
  debit_resolve.init({
    debit_id: DataTypes.INTEGER,
    secretary_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'debit_resolve',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return debit_resolve;
};