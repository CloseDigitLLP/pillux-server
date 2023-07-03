'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      exams.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorExam",onDelete: "CASCADE", onUpdate: "CASCADE"})
      exams.hasMany(models.planning_exams, {foreignKey:"exam_id",as:"studentExam",onDelete: "CASCADE", onUpdate: "CASCADE"})
      exams.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolExams",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  exams.init({
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    instructor_id: DataTypes.INTEGER,
    number_of_students: DataTypes.INTEGER,
    drivingschool_id: DataTypes.INTEGER,
    meeting_place: DataTypes.STRING,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    type_of_permission: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exams',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return exams;
};