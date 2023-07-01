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
      
      planning_exams.belongsTo(models.students,{foreignKey:"student_id",as:"studentExamPlanning",onDelete: "CASCADE", onUpdate: "CASCADE"})
      planning_exams.belongsTo(models.licences,{foreignKey:"licence_id",as:"licenceExams",onDelete: "CASCADE", onUpdate: "CASCADE"})
      planning_exams.belongsTo(models.exams,{foreignKey:"exam_id",as:"studentExam",onDelete: "CASCADE", onUpdate: "CASCADE"})
      planning_exams.hasOne(models.answers,{foreignKey:"event_id",as:"eventId",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  planning_exams.init({
    student_id: DataTypes.INTEGER,
    exam_id: DataTypes.INTEGER,
    licence_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    motif: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'planning_exams',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return planning_exams;
};