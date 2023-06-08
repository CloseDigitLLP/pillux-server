'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      document.hasMany(models.report_document,{foreignKey:"document_id",as:"documentReport",onDelete: "CASCADE", onUpdate: "CASCADE"})
      document.hasMany(models.penalty_document,{foreignKey:"document_id",as:"documentPenalty",onDelete: "CASCADE", onUpdate: "CASCADE"})
      document.hasMany(models.student_document,{foreignKey:"document_id",as:"documentStudent",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  document.init({
    path: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'documents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return document;
};