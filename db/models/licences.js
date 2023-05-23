'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class licences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      licences.hasMany(models.reservation,{foreignKey:"licence_id",as:"licenceReservation"})
      licences.hasMany(models.planning_exams,{foreignKey:"licence_id",as:"licenceExams"})
    }
  }
  licences.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'licences',
  });
  return licences;
};