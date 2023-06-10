'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      settings.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolSettings",onDelete: "CASCADE", onUpdate: "CASCADE"})

    }
  }
  settings.init({
    drivingschool_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'settings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return settings;
};