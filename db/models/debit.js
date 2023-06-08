'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class debit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      debit.belongsTo(models.students,{foreignKey:"student_id",as:"studentDebit",onDelete: "CASCADE", onUpdate: "CASCADE"})
      debit.hasOne(models.debit_resolve,{foreignKey:"debit_id",as:"debitId",onDelete: "CASCADE", onUpdate: "CASCADE"})

    }
  }
  debit.init({
    student_id: DataTypes.INTEGER,
    money_left: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'debits',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return debit;
};