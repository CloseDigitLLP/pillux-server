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
      users.belongsTo(models.roles,{foreignKey:"role_id",as:"usersRole"})
      users.hasMany(models.planning_generals,{foreignKey:"instructor_id",as:"instructorGenerals"})
      users.hasMany(models.reservation,{foreignKey:"instructor_id",as:"instructorReservation"})
      users.hasMany(models.vehicles,{foreignKey:"instructor_id",as:"instructorVehicles"})
      users.hasMany(models.repairs,{foreignKey:"instructor_id",as:"instructorRepairs"})
      users.hasMany(models.penalties,{foreignKey:"instructor_id",as:"instructorPenalty"})
      users.hasMany(models.report,{foreignKey:"instructor_id",as:"instructorReport"})
      users.hasMany(models.user_group,{foreignKey:"user_id",as:"userGroup"})
      users.hasMany(models.user_drivingschool,{foreignKey:"user_id",as:"userDrivingschool"})
      users.hasMany(models.repair_document,{foreignKey:"instructor_id",as:"instructorRepirsDoc"})
      users.hasMany(models.student_skill,{foreignKey:"instructor_id",as:"instructorStudentSkill"})
      users.hasMany(models.user_permissions, {foreignKey: "user_id",as: "userPermissions"})
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