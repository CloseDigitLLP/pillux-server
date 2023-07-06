'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exam_wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      exam_wishlist.belongsTo(models.students,{foreignKey:"student_id",as:"studentExamWishlist",onDelete: "CASCADE", onUpdate: "CASCADE"})
      exam_wishlist.belongsTo(models.users,{foreignKey:"instructor_id",as:"instructorExamWishlist",onDelete: "CASCADE", onUpdate: "CASCADE"})
    }
  }
  exam_wishlist.init({
    student_id: DataTypes.INTEGER,
    instructor_id: DataTypes.INTEGER,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    status: DataTypes.ENUM('approved', 'rejected', 'pending')
  }, {
    sequelize,
    modelName: 'exam_wishlist',
    tableName: 'exam_wishlists',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return exam_wishlist;
};