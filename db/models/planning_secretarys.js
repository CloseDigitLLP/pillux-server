'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planning_secretarys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      planning_secretarys.hasMany(models.alert_resolve, { foreignKey: "secretary_id", as: "secretaryAlert", onDelete: "CASCADE", onUpdate: "CASCADE" })
      planning_secretarys.hasMany(models.debit_resolve, { foreignKey: "secretary_id", as: "secretaryDebit", onDelete: "CASCADE", onUpdate: "CASCADE" })
      planning_secretarys.hasMany(models.planning_generals, { foreignKey: "secretary_id", as: "secretaryGenerals", onDelete: "CASCADE", onUpdate: "CASCADE" })
      planning_secretarys.belongsTo(models.driving_schools, { foreignKey: "drivingschool_id", as: "drivingSchoolSecreatrys", onDelete: "CASCADE", onUpdate: "CASCADE" })
      planning_secretarys.hasMany(models.students, { foreignKey: "student_id", as: "studentSecretary", onDelete: "CASCADE", onUpdate: "CASCADE" })
    }
  }
  planning_secretarys.init({
    drivingschool_id: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    status: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'planning_secretarys',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return planning_secretarys;
};