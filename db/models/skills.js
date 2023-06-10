'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      skills.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolSkills",onDelete: "CASCADE", onUpdate: "CASCADE"})
      skills.hasMany(models.student_skill,{foreignKey:"skill_id",as:"skillId",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  skills.init({
    drivingschool_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    level: DataTypes.STRING,
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'skills',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return skills;
};