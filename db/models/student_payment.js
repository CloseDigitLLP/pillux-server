'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_payment extends Model {
    static associate(models) {
      // define association here
      student_payment.belongsTo(models.student_formula,{foreignKey:"student_formula_id",as:"studentFormulaId"})
      student_payment.belongsTo(models.planning_secretarys,{foreignKey:"secretary_id",as:"secretaryStudentPayment"})
    }
  }
  student_payment.init({
    student_formula_id: DataTypes.INTEGER,
    mode: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    numberbankcheck: DataTypes.INTEGER,
    secretary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return student_payment;
};