'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student_document.belongsTo(models.students,{foreignKey:"student_id",as:"studentDocument"})
      student_document.belongsTo(models.document,{foreignKey:"document_id",as:"documentStudent"})
    }
  }
  student_document.init({
    student_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    document_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_document',
  });
  return student_document;
};