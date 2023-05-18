'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reservation.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorReservation"})
      reservation.belongsTo(models.licences,{foreignKey:"licence_id",as:"licenceReservation"})
      reservation.belongsTo(models.students,{foreignKey:"student_id",as:"studentReservation"})
      
    }
  }
  reservation.init({
    student_id: DataTypes.INTEGER,
    licence_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    hours_left: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reservation',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return reservation;
};