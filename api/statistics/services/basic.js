const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = {
  packages: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['$formulaId.drivingschool_id$'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }
      let currentYear = new Date().getFullYear();
      return await framework.models.student_formula.findAll({
        attributes: [
          'formula_id',
          [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
          [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
          [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity'],
        ],
        include: [
          {
            model: framework.models.formula,
            as: 'formulaId',
            attributes: ['name'],
          },
        ],
        where: {
          ...where,
          [Op.and]: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), currentYear)],
        },
        group: [
          'formula_id',
          Sequelize.fn('YEAR', Sequelize.col('date')),
          Sequelize.fn('MONTH', Sequelize.col('date')),
        ],
      });
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },
  hours: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['$formulaId.drivingschool_id$'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }
      let currentYear = new Date().getFullYear();
      return await framework.models.student_formula.findAll({
        attributes: [
          'formula_id',
          [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
          [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
          [Sequelize.literal('SUM(`formulaId`.`hour` * `student_formulas`.`quantity`)'), 'totalHour'],
        ],
        include: [
          {
            model: framework.models.formula,
            as: 'formulaId',
            attributes: ['name', 'hour'],
          },
        ],
        where: {
          ...where,
          [Op.and]: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), currentYear)],
        },
        group: [
          'formula_id',
          Sequelize.fn('YEAR', Sequelize.col('date')),
          Sequelize.fn('MONTH', Sequelize.col('date')),
        ],
      });
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },
};
