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
      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const monthlyResults = await framework.models.student_formula.findAll({
        attributes: [
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
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), { [Op.in]: allMonths }),
          ],
        },
        group: [Sequelize.fn('YEAR', Sequelize.col('date')), Sequelize.fn('MONTH', Sequelize.col('date'))],
      });

      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          totalHour: 0,
        };
      });

      const yearlyResults = await framework.models.student_formula.findAll({
        attributes: [
          [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'],
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
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), { [Op.lte]: currentYear }),
          ],
        },
        group: [Sequelize.fn('YEAR', Sequelize.col('date'))],
        raw: true,
      });

      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].totalHour = yearInfo.totalHour;
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

  plannings: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['drivingschool_id'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }

      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const monthlyResults = await framework.models.planning_generals.findAll({
        where,
        attributes: [
          'drivingschool_id',
          [Sequelize.fn('MONTH', Sequelize.col('start_horary')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.fn(
              'SUM',
              Sequelize.literal('TIME_TO_SEC(TIMEDIFF(end_horary, start_horary)) / 3600')
            ),
            'total_hours'
          ],
        ],
        include: [
          {
            model: framework.models.driving_schools,
            as: 'drivingSchoolGenrals',
            attributes: [],
          },
        ],
        group: ['drivingschool_id', 'month', 'year'],
      });
  
      const yearlyResults = await framework.models.planning_generals.findAll({
        where,
        attributes: [
          'drivingschool_id',
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.fn(
              'SUM',
              Sequelize.literal('TIME_TO_SEC(TIMEDIFF(end_horary, start_horary)) / 3600')
            ),
            'total_hours'
          ],
        ],
        include: [
          {
            model: framework.models.driving_schools,
            as: 'drivingSchoolGenrals',
            attributes: [],
          },
        ],
        group: ['drivingschool_id', 'year'],
      });
  
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },
};
