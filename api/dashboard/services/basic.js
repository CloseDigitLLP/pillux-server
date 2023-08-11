const { Sequelize } = require('sequelize');

module.exports = {
  fetch: async (user) => {
    try {
      const drivingschoolIds = user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id);
      let monitorsWhere = {};
      if (user?.usersRole?.name !== 'Super Gérants') {
        monitorsWhere['$userDrivingschool.drivingschool_id$'] = {
          [Sequelize.Op.in]: drivingschoolIds,
        };
      }
      const noOfMonitors = await framework.models.users.count({
        where: {
          role_id: 1,
          ...monitorsWhere,
          enabled: true
        },
        include: [
          {
            model: framework.models.user_drivingschool,
            as: 'userDrivingschool',
            attributes: [],
          },
        ],
      });
      
      const result = await framework.models.planning_exams.findOne({
        attributes: [
          [Sequelize.literal('COUNT(CASE WHEN status = "pass" AND motif=0 THEN 1 END)'), 'codeTypesInWeek'],
          [Sequelize.literal('COUNT(CASE WHEN status = "pass" AND motif=1 THEN 1 END)'), 'conduitTypesInWeek'],
          [Sequelize.literal('COUNT(CASE WHEN status = "pass" THEN 1 END)'), 'passedStudentInWeek'],
        ],
        where: {
          created_at: {
            [Sequelize.Op.gt]: Sequelize.literal('current_date() - interval 7 day'),
          },
        },
      });
      const codeTypesInWeek = result.get('codeTypesInWeek');
      const conduitTypesInWeek = result.get('conduitTypesInWeek');
      const passedStudentInWeek = result.get('passedStudentInWeek');

      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      let rolesConditionInResult1 = {};

      if (user?.usersRole?.name !== 'Super Gérants') {
        rolesConditionInResult1 = {
          drivingschool_id: {
            [Sequelize.Op.in]: drivingschoolIds,
          },
        };
      }

      const result1 = await framework.models.planning_exams.findOne({
        attributes: [
          [
            Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN planning_exams.status = "pass" AND motif=0 THEN 1 END')),
            'codeTypesInMonth',
          ],
          [
            Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN planning_exams.status = "pass" AND motif=1 THEN 1 END')),
            'conduitTypesInMonth',
          ],
        ],
        include: [
          {
            model: framework.models.students,
            as: 'studentExamPlanning',
            attributes: ['id', 'firstname', 'lastname', 'drivingschool_id'],
            where: {
              ...rolesConditionInResult1,
            },
          },
        ],
        where: {
          created_at: {
            [Sequelize.Op.gt]: oneMonthAgo,
            [Sequelize.Op.lte]: currentDate,
          },
        },
      });
      const codeTypesInMonth = result1.get('codeTypesInMonth');
      const conduitTypesInMonth = result1.get('conduitTypesInMonth');

      let rolesConditionInNewStudents = {};
      if (user?.usersRole?.name !== 'Super Gérants') {
        rolesConditionInNewStudents = {
          drivingschool_id: {
            [Sequelize.Op.in]: drivingschoolIds,
          },
        };
      }

      const newStudents = await framework.models.students.count({
        where: {
          created_at: {
            [Sequelize.Op.gt]: Sequelize.literal('current_date() - interval 7 day '),
          },
          ...rolesConditionInNewStudents,
        },
      });

      // const totalPassedStudWeek=await framework.models.planning_exams.count({
      //   where:{

      //   }
      // })

      return {
        monitors: noOfMonitors,
        codeTypesInWeek,
        conduitTypesInWeek,
        codeTypesInMonth,
        conduitTypesInMonth,
        newStudents,
        passedStudentInWeek,
      };
    } catch (error) {
      console.log('Error => ', error);
      return Promise.reject(error);
    }
  },
};
