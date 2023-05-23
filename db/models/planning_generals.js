'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planning_generals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      planning_generals.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolId"})
      planning_generals.belongsTo(models.students,{foreignKey:"student_id",as:"studentId"})
      planning_generals.belongsTo(models.planning_secretarys,{foreignKey:"secretary_id",as:"secretaryGenerals"})
      planning_generals.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorGenerals"})
    }
  }
  planning_generals.init({
    drivingschool_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    secretary_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    start_horary: DataTypes.DATE,
    end_horary: DataTypes.DATE,
    type: DataTypes.STRING,
    gearbox: DataTypes.STRING,
    comment: DataTypes.STRING,
    status: DataTypes.STRING,
    motif: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'planning_generals',
  });
  return planning_generals;
};