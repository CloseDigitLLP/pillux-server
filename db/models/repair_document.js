'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class repair_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      repair_document.belongsTo(models.repairs, { foreignKey: "repair_id", as: "repairDoc", onDelete: "CASCADE", onUpdate: "CASCADE" })
      repair_document.belongsTo(models.document, { foreignKey: "document_id", as: "documentRepair", onDelete: "CASCADE", onUpdate: "CASCADE" })
    }
  }
  repair_document.init({
    vehicle_id: DataTypes.INTEGER,
    repair_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    document_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'repair_documents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return repair_document;
};