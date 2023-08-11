const Sequelize = require('sequelize');

module.exports = {
  fetch: async (id, where = {}, user) => {
    try {
      if (user?.usersRole?.name !== 'Super Gérants') {
        where['$userDrivingschool.drivingschool_id$'] = {
          [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
        };
      }

      if (id) {
        where.id = id;
      }
      where.enabled = true;
      const currentMonthStart = "DATE_FORMAT(NOW(), '%Y-%m-01')";
      const currentMonthEnd = 'LAST_DAY(NOW())';
      const lastMonthStart = "DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01')";
      const lastMonthEnd = 'LAST_DAY(NOW() - INTERVAL 1 MONTH)';

      return await framework.models.users.findAll({
        include: [
          {
            model: framework.models.planning_generals,
            as: 'instructorGenerals',
            attributes: [
              'instructor_id',
              [Sequelize.literal('SUM(TIMESTAMPDIFF(HOUR,start_horary, end_horary))'), 'total_duration_all_time'],
              [
                Sequelize.literal(`SUM(CASE
                  WHEN DATE(start_horary) >= ${currentMonthStart}
                  AND DATE(start_horary) <= ${currentMonthEnd}
                  THEN TIMESTAMPDIFF(HOUR,start_horary, end_horary)
                  ELSE 0
                  END)`),
                'total_duration_current_month',
              ],
              [
                Sequelize.literal(`SUM(CASE
                  WHEN DATE(start_horary) >= ${lastMonthStart}
                  AND DATE(start_horary) <= ${lastMonthEnd}
                    THEN TIMESTAMPDIFF(HOUR,start_horary, end_horary)
                  ELSE 0
                  END)`),
                'total_duration_last_month',
              ],
            ],
            required: false,
            group: ['instructor_id'],
            where: {
              status: 'present',
            },
          },
          {
            model: framework.models.user_drivingschool,
            as: 'userDrivingschool',
          },
        ],
        attributes: ['id', 'firstname', 'lastname'],
        where: {
          role_id: '1',
          ...where,
        },
        group: ['id'],
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  create: async (data) => {
    try {
      return await framework.models.users.bulkCreate([data], {
        include: [
          {
            as: 'userDrivingschool',
            model: framework.models.user_drivingschool,
          },
        ],
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
