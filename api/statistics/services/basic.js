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
        where['$instructorGenerals.userDrivingschool.drivingschool_id$'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }

      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          total_hours: 0,
        };
      });

      const monthlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          [Sequelize.fn('MONTH', Sequelize.col('start_horary')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.in]: allMonths }),
          ],
        },
        group: ['month', 'year'],
        raw: true,
      });

      const yearlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          'drivingschool_id',
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.lte]: currentYear }),
          ],
        },
        group: ['drivingschool_id', 'year'],
        raw: true,
      });

      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].total_hours = yearInfo.total_hours;
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

  modify: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['$instructorGenerals.userDrivingschool.drivingschool_id$'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }

      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          total_hours: 0,
        };
      });

      const monthlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          [Sequelize.fn('MONTH', Sequelize.col('start_horary')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.in]: allMonths }),
            { is_updated: true },
          ],
        },
        group: ['month', 'year'],
        raw: true,
      });

      const yearlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          'drivingschool_id',
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.lte]: currentYear }),
            { is_updated: true },
          ],
        },
        group: ['drivingschool_id', 'year'],
        raw: true,
      });

      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].total_hours = yearInfo.total_hours;
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

  cancled: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['$instructorGenerals.userDrivingschool.drivingschool_id$'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }

      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          total_hours: 0,
        };
      });

      const monthlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          [Sequelize.fn('MONTH', Sequelize.col('start_horary')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.in]: allMonths }),
            { status: 'absent' },
          ],
        },
        group: ['month', 'year'],
        raw: true,
      });

      const yearlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          'drivingschool_id',
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.lte]: currentYear }),
            { status: 'absent' },
          ],
        },
        group: ['drivingschool_id', 'year'],
        raw: true,
      });

      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].total_hours = yearInfo.total_hours;
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

  errored: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['$instructorGenerals.userDrivingschool.drivingschool_id$'] = {
          [Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }

      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          total_hours: 0,
        };
      });

      const monthlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          [Sequelize.fn('MONTH', Sequelize.col('start_horary')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.in]: allMonths }),
            { is_errored: true },
          ],
        },
        group: ['month', 'year'],
        raw: true,
      });

      const yearlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          'drivingschool_id',
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.lte]: currentYear }),
            { is_errored: true },
          ],
        },
        group: ['drivingschool_id', 'year'],
        raw: true,
      });

      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].total_hours = yearInfo.total_hours;
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

  totalInstructorHours: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name === 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          hours: 0,
        };
      });

      const monthlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          [Sequelize.fn('MONTH', Sequelize.col('start_horary')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.in]: allMonths }),
            {
              status: {
                [Op.in]: ['present', 'absent'],
              },
            },
            {
              motif: {
                [Op.not]: 'Instructeur absent',
              },
            },
          ],
        },
        group: ['month', 'year'],
        raw: true,
      });

      const yearlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          'instructor_id',
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'hours',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.lte]: currentYear }),
            {
              status: {
                [Op.in]: ['present', 'absent'],
              },
            },
            {
              motif: {
                [Op.not]: 'Instructeur absent',
              },
            },
          ],
        },
        group: ['instructor_id', 'year'],
        raw: true,
      });

      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].hours = yearInfo.hours;
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

  absentInstructorList: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name === 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      return await framework.models.planning_generals.findAll({
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('start_horary')), 'date'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
        ],
        where: {
          ...where,
          [Op.and]: [
            {
              status: {
                [Op.in]: ['absent'],
              },
            },
            {
              motif: {
                [Op.eq]: 'Instructeur absent',
              },
            },
          ],
        },
        group: ['date'],
        order: [[Sequelize.col('date'), 'DESC']],
      });
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },

  wishlistInstructorCount: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name === 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      let data = await framework.models.exam_wishlist.findAll({
        attributes: ['instructor_id', [Sequelize.fn('COUNT', Sequelize.col('student_id')), 'studentCount']],
        where,
        group: ['instructor_id'],
      });

      return data[0]
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },

  averageInstructorHours: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name === 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      const currentYear = new Date().getFullYear();
      const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
      const startYear = 2013;
      const allYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

      const populatedYearlyResults = allYears.map((year) => {
        return {
          year,
          total_hours: 0,
          total_students: 0,
          hours: 0,
        };
      });

      const populatedMonthlyResults = allMonths.map((month) => {
        return {
          month,
          total_hours: 0,
          total_students: 0,
          hours: 0,
        };
      });

      const monthlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          [Sequelize.fn('MONTH', Sequelize.col('start_horary')), 'month'],
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
          [Sequelize.fn('COUNT', Sequelize.col('student_id')), 'total_students'],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), currentYear),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.in]: allMonths }),
            {
              status: {
                [Op.in]: ['present', 'absent'],
              },
            },
            {
              motif: {
                [Op.not]: 'Instructeur absent',
              },
            },
          ],
        },
        group: ['month', 'year'],
        raw: true,
      });

      const yearlyResults = await framework.models.planning_generals.findAll({
        attributes: [
          'instructor_id',
          [Sequelize.fn('YEAR', Sequelize.col('start_horary')), 'year'],
          [
            Sequelize.literal('CAST(SUM(TIMESTAMPDIFF(SECOND, start_horary, end_horary) / 3600) AS SIGNED)'),
            'total_hours',
          ],
          [Sequelize.fn('COUNT', Sequelize.col('student_id')), 'total_students'],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: [],
            include: [
              {
                model: framework.models.user_drivingschool,
                as: 'userDrivingschool',
                attributes: [],
              },
            ],
          },
        ],
        where: {
          ...where,
          [Op.and]: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('start_horary')), { [Op.gte]: startYear }),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_horary')), { [Op.lte]: currentYear }),
            {
              status: {
                [Op.in]: ['present', 'absent'],
              },
            },
            {
              motif: {
                [Op.not]: 'Instructeur absent',
              },
            },
          ],
        },
        group: ['instructor_id', 'year'],
        raw: true,
      });

      yearlyResults.forEach((yearInfo) => {
        const yearIndex = yearInfo.year - startYear;
        if (populatedYearlyResults[yearIndex]) {
          populatedYearlyResults[yearIndex].total_hours = yearInfo.total_hours;
          populatedYearlyResults[yearIndex].total_students = yearInfo.total_students;
          if (yearInfo.total_students > 0) {
            populatedYearlyResults[yearIndex].hours =
              yearInfo.total_hours / yearInfo.total_students;
          }
        }
      });

      monthlyResults.forEach((monthInfo) => {
        const monthIndex = monthInfo.month - 1;
        if (populatedMonthlyResults[monthIndex]) {
          populatedMonthlyResults[monthIndex].total_hours = monthInfo.total_hours;
          populatedMonthlyResults[monthIndex].total_students = monthInfo.total_students;
          if (monthInfo.total_students > 0) {
            populatedMonthlyResults[monthIndex].hours =
              monthInfo.total_hours / monthInfo.total_students;
          }
        }
      });

      return {
        monthly: populatedMonthlyResults,
        yearly: populatedYearlyResults,
      };
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },

  vehicleInstructorTotal: async (user, where = {}) => {
    try {
      if (user?.usersRole?.name === 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      const vehicles = await framework.models.vehicles.findAll({
        attributes: [
          'id',
          'name',
          [
            Sequelize.literal('(SELECT SUM(`amount`) FROM `repairs` WHERE `vehicle_id` = `vehicles`.`id`)'),
            'total_repair'
          ],
          [
            Sequelize.literal('(SELECT SUM(`amount`) FROM `penalties` WHERE `vehicle_id` = `vehicles`.`id`)'),
            'total_penalty'
          ],
          [
            Sequelize.literal('(SELECT SUM(`amount`) FROM `reports` WHERE `vehicle_id` = `vehicles`.`id`)'),
            'total_report'
          ]
        ],
        include: [
          {
            model: framework.models.repairs,
            as: 'vehicleRepairs',
            attributes: [],
          },
          {
            model: framework.models.penalties,
            as: 'vehiclePenalty',
            attributes: [],
          },
          {
            model: framework.models.report,
            as: 'vehicleReport',
            attributes: [],
          },
        ],
        where,
        group: ['id'],
      });

      const results = vehicles.map((vehicle) => {
        return {
          id: vehicle.dataValues.id,
          name: vehicle.dataValues.name,
          repair: vehicle.dataValues.total_repair || 0,
          penalty: vehicle.dataValues.total_penalty || 0,
          report: vehicle.dataValues.total_report || 0,
        };
      });

      return results;
    } catch (error) {
      console.log('Error is ==>', error);
      return Promise.reject(error);
    }
  },
};
