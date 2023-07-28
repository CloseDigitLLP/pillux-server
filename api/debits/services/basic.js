const { Sequelize } = require("sequelize");

module.exports = {
  fetch: async (user) => {
    try {

      let rolesCondition = {}
      if(user?.usersRole?.name == 'Secrétaires'){
        rolesCondition = {
          drivingschool_id: {
            [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
          }
        }
      }

      return await framework.models.students.findAll({
        include: [
          {
            model: framework.models.student_formula,
            as: "studentFormula",
            separate: true,
            order: [['id', 'ASC']],
            include: [
              {
                model: framework.models.formula,
                as: 'formulaId',
              },
              {
                model: framework.models.student_payment,
                as: 'studentFormulaPayment',
                separate: true,
                order: [['id', 'ASC']]
              }
            ]
          },
          {
            model: framework.models.student_payment,
            as: 'studentPayments'
          }
        ],
        attributes: [
          'id',
          'lastname',
          'firstname',
          'date_code',
          'email'
        ],
        where: {
          ...rolesCondition,
          status: true,
        }
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  }
 
};
