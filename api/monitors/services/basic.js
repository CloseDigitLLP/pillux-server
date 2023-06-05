const Sequelize = require('sequelize');

module.exports = {
  fetch: async (id, where = {}) => {
    try {
      if (id) {
        where.id = id;
      }

      const currentMonthStart = "DATE_FORMAT(NOW(), '%Y-%m-01')";
      const currentMonthEnd = 'LAST_DAY(NOW())';
      const lastMonthStart = "DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01')";
      const lastMonthEnd = 'LAST_DAY(NOW() - INTERVAL 1 MONTH)';

      return await framework.models.planning_generals.findAll({
        attributes: [
          'instructor_id',
          [Sequelize.literal('SUM(TIMEDIFF(end_horary, start_horary))'), 'total_duration_all_time'],
          [
            Sequelize.literal(`SUM(CASE
              WHEN DATE(start_horary) >= ${currentMonthStart}
                AND DATE(start_horary) <= ${currentMonthEnd}
                THEN TIMEDIFF(end_horary, start_horary)
              ELSE 0
            END)`),
            'total_duration_current_month',
          ],
          [
            Sequelize.literal(`SUM(CASE
              WHEN DATE(start_horary) >= ${lastMonthStart}
                AND DATE(start_horary) <= ${lastMonthEnd}
                THEN TIMEDIFF(end_horary, start_horary)
              ELSE 0
            END)`),
            'total_duration_last_month',
          ],
        ],
        include: [
          {
            model: framework.models.users,
            as: 'instructorGenerals',
            attributes: ['firstname'],
          },
        ],
        where: {
          status: 'approved',
          ...where,
        },
        group: ['instructor_id'],
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  create: async (data) => {
    try {
      
      return await framework.models.users.bulkCreate(
        [data],{
        include:[{
            as: "userDrivingschool",
            model: framework.models.user_drivingschool
        }]
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
