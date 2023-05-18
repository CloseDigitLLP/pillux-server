'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_drivingschool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_drivingschool.belongsTo(models.users,{foreignKey:"user_id",as:"userDrivingschool"})
      user_drivingschool.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolUser"})
    }
  }
  user_drivingschool.init({
    user_id: DataTypes.INTEGER,
    drivingschool_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_drivingschool',
  });
  return user_drivingschool;
};