'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penalty_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      penalty_document.belongsTo(models.penalties,{foreignKey:"penalty_id",as:"penaltyId",onDelete: "CASCADE", onUpdate: "CASCADE"})
      penalty_document.belongsTo(models.document,{foreignKey:"document_id",as:"documentPenalty",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  penalty_document.init({
    penalty_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    document_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'penalty_documents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return penalty_document;
};