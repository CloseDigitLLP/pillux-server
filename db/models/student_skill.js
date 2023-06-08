'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student_skill.belongsTo(models.students,{foreignKey:"student_id",as:"studentSkills",onDelete: "CASCADE", onUpdate: "CASCADE"})
      student_skill.belongsTo(models.skills,{foreignKey:"skill_id",as:"skillId",onDelete: "CASCADE", onUpdate: "CASCADE"})
      student_skill.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorStudentSkill",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  student_skill.init({
    student_id: DataTypes.INTEGER,
    skill_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student_skills',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return student_skill;
};