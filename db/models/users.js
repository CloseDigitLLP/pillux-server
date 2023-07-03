'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.roles,{foreignKey:"role_id",as:"usersRole",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.planning_generals,{foreignKey:"instructor_id",as:"instructorGenerals",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.reservation,{foreignKey:"instructor_id",as:"instructorReservation",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.vehicles,{foreignKey:"instructor_id",as:"instructorVehicles",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.repairs,{foreignKey:"instructor_id",as:"instructorRepairs",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.penalties,{foreignKey:"instructor_id",as:"instructorPenalty",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.report,{foreignKey:"instructor_id",as:"instructorReport",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.user_group,{foreignKey:"user_id",as:"userGroup",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.user_drivingschool,{foreignKey:"user_id",as:"userDrivingschool",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.student_skill,{foreignKey:"instructor_id",as:"instructorStudentSkill",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.user_permissions, {foreignKey: "user_id",as: "userPermissions",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.student_formula,{foreignKey:"secretary_id",as:"secretaryStudentFormula",onDelete: "CASCADE", onUpdate: "CASCADE"})
      users.hasMany(models.student_payment, { foreignKey: "secretary_id", as: "secretaryStudentPayment", onDelete: "CASCADE", onUpdate: "CASCADE" })
      users.hasMany(models.exams, {foreignKey: "instructor_id",as: "instructorExam",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  users.init({
    photo_id: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    email_canonical: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    last_login: DataTypes.DATE,
    confirmation_token: DataTypes.STRING,
    password_requested_at: DataTypes.DATE,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return users;
};