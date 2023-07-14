'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_formula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student_formula.belongsTo(models.students,{foreignKey:"student_id",as:"studentFormula",onDelete: "CASCADE", onUpdate: "CASCADE"})
      student_formula.belongsTo(models.formula,{foreignKey:"formula_id",as:"formulaId",onDelete: "CASCADE", onUpdate: "CASCADE"})
      student_formula.belongsTo(models.users,{foreignKey:"secretary_id",as:"secretaryStudentFormula",onDelete: "CASCADE", onUpdate: "CASCADE"})
      student_formula.hasMany(models.student_payment,{foreignKey:"student_formula_id",as:"studentFormulaPayment",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  student_formula.init({
    student_id: DataTypes.INTEGER,
    formula_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    installments: DataTypes.INTEGER,
    first_installment_hours: DataTypes.INTEGER,
    second_installment_hours: DataTypes.INTEGER,
    third_installment_hours: DataTypes.INTEGER,
    secretary_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'student_formulas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return student_formula;
};