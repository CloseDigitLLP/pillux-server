'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driving_schools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      driving_schools.hasMany(models.students,{foreignKey:"drivingschool_id",as:"drivingSchoolStudents"})
      driving_schools.hasMany(models.skills,{foreignKey:"drivingschool_id",as:"drivingSchoolSkills"})
      driving_schools.hasMany(models.emails,{foreignKey:"drivingschool_id",as:"drivingSchoolEmails"})
      driving_schools.hasOne(models.settings,{foreignKey:"drivingschool_id",as:"drivingSchoolSettings"})
      driving_schools.hasOne(models.formula,{foreignKey:"drivingschool_id",as:"drivingSchoolFormula"})
      driving_schools.hasMany(models.planning_secretarys,{foreignKey:"drivingschool_id",as:"drivingSchoolSecreatrys"})
      driving_schools.hasMany(models.planning_exams,{foreignKey:"drivingschool_id",as:"drivingSchoolExams"})
      driving_schools.hasMany(models.vehicles,{foreignKey:"drivingschool_id",as:"drivingSchoolVehicles"})
      driving_schools.hasMany(models.user_drivingschool,{foreignKey:"drivingschool_id",as:"drivingSchoolUser"})
    }
  }
  driving_schools.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'driving_schools',
  });
  return driving_schools;
};