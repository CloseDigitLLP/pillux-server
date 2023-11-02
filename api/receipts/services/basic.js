const { Op } = require('sequelize');
const moment = require('moment');

module.exports = {
  fetch: async (user, startDate, endDate, where = {}) => {
    try {
      if (user?.usersRole?.name === 'Secrétaires' || user?.usersRole?.name === 'Gérants') {
        where['drivingschool_id'] = {
          [Op.in]: user?.userDrivingschool?.map((ds) => ds.drivingschool_id),
        };
      }
      let start = moment(startDate, 'DD/MM/YYYY').format("YYYY-MM-DD")
      let end = moment(endDate, 'DD/MM/YYYY').format("YYYY-MM-DD")
      
      return await framework.models.students.findAll({
        include: [
          {
            model: framework.models.student_formula,
            as: 'studentFormula',
            attributes: ['formula_id', 'quantity', 'secretary_id'],
            separate: true,
            order: [['id', 'DESC']],
            include: [
              {
                model: framework.models.student_payment,
                as: 'studentFormulaPayment',
                attributes: ['mode', 'id', 'amount', 'numberbankcheck', 'created_at', 'updated_at', 'secretary_id'],
                order: [['id', 'DESC']]
              },
              {
                model: framework.models.formula,
                as: 'formulaId',
                attributes: ['name', 'id', 'price', 'hour', 'type'],
              },
            ],
            where: {
              ['$studentFormulaPayment.created_at$']: {
                [Op.between]: [start, end],
              },
            },
          },
        ],
        attributes: ['id', 'firstname', 'lastname'],
        where,
        order: [['id', 'DESC']],
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
