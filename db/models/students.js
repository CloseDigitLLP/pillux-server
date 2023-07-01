'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      students.hasMany(models.alerts, { foreignKey: "student_id", as: "studentAlerts" ,onDelete: "CASCADE", onUpdate: "CASCADE"})
      students.hasMany(models.debit, { foreignKey: "student_id", as: "studentDebit",onDelete: "CASCADE", onUpdate: "CASCADE" })
      students.belongsTo(models.driving_schools, { foreignKey: "drivingschool_id", as: "drivingSchoolStudents",onDelete: "CASCADE", onUpdate: "CASCADE" })
      students.hasMany(models.planning_secretarys, { foreignKey: "student_id", as: "studentSecretary" ,onDelete: "CASCADE", onUpdate: "CASCADE"})
      students.hasMany(models.reservation, { foreignKey: "student_id", as: "studentReservation" ,onDelete: "CASCADE", onUpdate: "CASCADE"})
      students.hasMany(models.planning_exams, { foreignKey: "student_id", as: "studentExamPlanning" ,onDelete: "CASCADE", onUpdate: "CASCADE"})
      students.hasMany(models.student_skill, { foreignKey: "student_id", as: "studentSkills" ,onDelete: "CASCADE", onUpdate: "CASCADE"})
      students.hasMany(models.student_document, { foreignKey: "student_id", as: "studentDocument" ,onDelete: "CASCADE", onUpdate: "CASCADE"})
      students.hasMany(models.student_formula, { foreignKey: "student_id", as: "studentFormula" ,onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  students.init({
    photo_id: DataTypes.STRING,
    gender: DataTypes.STRING,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    department: DataTypes.STRING,
    place_birthday: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    place_meet: DataTypes.STRING,
    neph: DataTypes.STRING,
    status: DataTypes.STRING,
    drivingschool_id:DataTypes.INTEGER,
    date_code: DataTypes.DATE,
    docsType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return students;
};