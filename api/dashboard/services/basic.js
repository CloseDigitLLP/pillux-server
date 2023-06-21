const { Sequelize } = require("sequelize");

module.exports = {
  fetch: async () => {
    try {
      const noOfMonitors= await framework.models.users.count({
        where: { role_id: 2 },
      });

      const result = await framework.models.planning_exams.findOne({
        attributes: [
          [Sequelize.literal('COUNT(CASE WHEN status = "pass" THEN id END)'), 'examPassedInWeek'],
          [Sequelize.literal('COUNT(id)'), 'studentInWeek']
        ],
        where: {
          created_at: {
            [Sequelize.Op.gt]: Sequelize.literal("current_date() - interval 7 day")
          }
        }
      });
      const examPassedInWeek = result.get('examPassedInWeek');
      const studentInWeek = result.get('studentInWeek');
      
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const result1 = await framework.models.planning_exams.findOne({
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.literal('DISTINCT id')), 'studentInMonth'],
          [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN status = "pass" THEN 1 END')), 'examPassedInMonth']
        ],
        where: {
          created_at: {
            [Sequelize.Op.gt]: oneMonthAgo,
            [Sequelize.Op.lte]: currentDate
          }
        }
      });
      
      const studentInMonth = result1.get('studentInMonth');
      const examPassedInMonth = result1.get('examPassedInMonth');
    //   const studentInWeek=await framework.models.planning_exams.count({
    //     where:{
    //         created_at:{
    //             [Sequelize.Op.gt] : Sequelize.literal("current_date() - interval 7 day")
    //          }
    //     }
    //   })
    //   const examPassedInWeek=await framework.models.planning_exams.count({
    //     where: {
    //          status:"pass",
    //          created_at:{
    //             [Sequelize.Op.gt] : Sequelize.literal("current_date() - interval 7 day")
    //          }
    //     }
    //   })
    //   const studentInMonth=await framework.models.planning_exams.count({
    //     where:{
    //         created_at:{
    //             [Sequelize.Op.gt] : oneMonthAgo,
    //             [Sequelize.Op.lte]: currentDate
    //          }
    //     }
    //   })
    //   const examPassedInMonth=await framework.models.planning_exams.count({
    //     where: {
    //          status:"pass",
    //          created_at:{
    //             [Sequelize.Op.gt] : oneMonthAgo,
    //             [Sequelize.Op.lte]: currentDate
    //          }
    //     }
    //   })

      const newStudents=await framework.models.students.count({
        where: {
            created_at : {
                [Sequelize.Op.gt] : Sequelize.literal("current_date() - interval 7 day ")
            }
        }
      })
       
      return {monitors:noOfMonitors ,studentInWeek, examPassedInWeek,studentInMonth ,examPassedInMonth, newStudents };
    } catch (error) {
      console.log('Error => ', error);
      return Promise.reject(error);
    }
  },
};
