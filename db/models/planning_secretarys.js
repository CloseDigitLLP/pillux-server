'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planning_secretarys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
          planning_secretarys.hasMany(models.alert_resolve,{foreignKey:"secretary_id",as:"secretaryAlert"})
          planning_secretarys.hasMany(models.debit_resolve,{foreignKey:"secretary_id",as:"secretaryDebit"})
          planning_secretarys.hasMany(models.planning_generals,{foreignKey:"secretary_id",as:"secretaryGenerals"})
          planning_secretarys.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolSecreatrys"})
          planning_secretarys.hasMany(models.student_payment,{foreignKey:"secretary_id",as:"secretaryStudentPayment"})
          planning_secretarys.hasMany(models.student_formula,{foreignKey:"secretary_id",as:"secretaryStudentFormula"})
          planning_secretarys.hasMany(models.students,{foreignKey:"student_id",as:"studentSecretary"})
    }
  }
  planning_secretarys.init({
    drivingschool_id: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    status: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'planning_secretarys',
  });
  return planning_secretarys;
};