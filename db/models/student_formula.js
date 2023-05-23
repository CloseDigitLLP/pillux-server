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
      student_formula.belongsTo(models.students,{foreignKey:"student_id",as:"studentFormula"})
      student_formula.belongsTo(models.formula,{foreignKey:"formula_id",as:"formulaId"})
      student_formula.belongsTo(models.planning_secretarys,{foreignKey:"secretary_id",as:"secretaryStudentFormula"})
      student_formula.hasOne(models.student_payment,{foreignKey:"student_formula_id",as:"studentFormulaId"})
    }
  }
  student_formula.init({
    student_id: DataTypes.INTEGER,
    formula_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    secretary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_formula',
  });
  return student_formula;
};