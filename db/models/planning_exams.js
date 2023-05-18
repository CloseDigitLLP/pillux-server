'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planning_exams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      planning_exams.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolExams"})
      planning_exams.belongsTo(models.students,{foreignKey:"student_id",as:"studentExams"})
      planning_exams.belongsTo(models.licences,{foreignKey:"licence_id",as:"licenceExams"})
      planning_exams.hasOne(models.answers,{foreignKey:"event_id",as:"eventId"})
    }
  }
  planning_exams.init({
    drivingschool_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    licence_id: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    status: DataTypes.STRING,
    motif: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'planning_exams',
  });
  return planning_exams;
};