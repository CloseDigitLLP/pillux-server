'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class formula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      formula.belongsTo(models.driving_schools,{foreignKey:"drivingschool_id",as:"drivingSchoolFormula",onDelete: "CASCADE", onUpdate: "CASCADE"})
      formula.hasMany(models.student_formula,{foreignKey:"formula_id",as:"formulaId",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  formula.init({
    drivingschool_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    hour: DataTypes.INTEGER,
    type: DataTypes.STRING,
    time_validity: DataTypes.INTEGER,
    tine_relance: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'formulas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return formula;
};