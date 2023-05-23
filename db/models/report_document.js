'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      report_document.belongsTo(models.report,{foreignKey:"report_id",as:"reportId"})
      report_document.belongsTo(models.document,{foreignKey:"document_id",as:"documentReport"})
    }
  }
  report_document.init({
    report_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    document_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'report_document',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return report_document;
};