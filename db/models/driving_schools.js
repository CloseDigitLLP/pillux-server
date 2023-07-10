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
      driving_schools.hasMany(models.students,{foreignKey:"drivingschool_id",as:"drivingSchoolStudents",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasMany(models.skills,{foreignKey:"drivingschool_id",as:"drivingSchoolSkills",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasMany(models.emails,{foreignKey:"drivingschool_id",as:"drivingSchoolEmails",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasOne(models.settings,{foreignKey:"drivingschool_id",as:"drivingSchoolSettings",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasOne(models.formula,{foreignKey:"drivingschool_id",as:"drivingSchoolFormula",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasMany(models.planning_secretarys,{foreignKey:"drivingschool_id",as:"drivingSchoolSecreatrys",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasMany(models.exams,{foreignKey:"drivingschool_id",as:"drivingSchoolExams",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasMany(models.vehicles,{foreignKey:"drivingschool_id",as:"drivingSchoolVehicles",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasMany(models.user_drivingschool,{foreignKey:"drivingschool_id",as:"drivingSchoolUser",onDelete: "CASCADE", onUpdate: "CASCADE"})
      driving_schools.hasMany(models.planning_generals,{foreignKey:"drivingschool_id",as:"drivingSchoolGenrals",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  driving_schools.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING,
    start_date: DataTypes.DATE,
    valid_date: DataTypes.DATE,
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'driving_schools',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return driving_schools;
};