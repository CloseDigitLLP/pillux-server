'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      emails.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolEmails"})
    }
  }
  emails.init({
    type: DataTypes.STRING,
    content: DataTypes.STRING,
    drivingschool_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'emails',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return emails;
};