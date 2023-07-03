'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_payment extends Model {
    static associate(models) {
      // define association here
      student_payment.belongsTo(models.student_formula,{foreignKey:"student_formula_id",as:"studentFormulaPayment",onDelete: "CASCADE", onUpdate: "CASCADE"})
      student_payment.belongsTo(models.users,{foreignKey:"secretary_id",as:"secretaryStudentPayment",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  student_payment.init({
    student_formula_id: DataTypes.INTEGER,
    type: DataTypes.ENUM("1er versement", "2eme versement", "3eme versement", "versement"),
    mode: DataTypes.ENUM("Virement", "Chèque", "Espéces", "Chéque à encaissement programmé", "Chéque de caution"),
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