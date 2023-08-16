const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = {
  totalCount: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['drivingschool_id'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }
  
      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
  
      const monthlyResults = await framework.models.students.findAll({
        attributes: [
          [Sequelize.fn('YEAR', Sequelize.col('created_at')), 'year'],
          [Sequelize.fn('MONTH', Sequelize.col('created_at')), 'month'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'newStudentCount'],
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), { [Op.in]: allMonths }),
          ],
        },
        group: [Sequelize.fn('YEAR', Sequelize.col('created_at')), Sequelize.fn('MONTH', Sequelize.col('created_at'))],
        raw: true,
      });
  
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  
      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          newStudentCount: 0,
        };
      });
  
      const yearlyResults = await framework.models.students.findAll({
        attributes: [
          [Sequelize.fn('YEAR', Sequelize.col('created_at')), 'year'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'newStudentCount'],
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), { [Op.lte]: currentYear }),
          ],
        },
        group: [Sequelize.fn('YEAR', Sequelize.col('created_at'))],
        raw: true,
      });
  
      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].newStudentCount = yearInfo.newStudentCount;
        }
      });
  
      return {
        monthly: monthlyResults,
        yearly: populatedYearlyResults,
      };
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
