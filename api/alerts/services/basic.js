const { Sequelize } = require("sequelize");

module.exports={
    fetch: async (user, where = {}) => {
        try {
            if(user?.usersRole?.name === 'Secrétaires'){
                  where['$studentAlerts.drivingschool_id$'] = { 
                    [Sequelize.Op.eq]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
                  }
              }
            return await framework.models.alerts.findAll({
                include: {
                  model: framework.models.students,
                  as: 'studentAlerts',
                  attributes: { exclude: ['student_id'] },
                },
                where
              });
            
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
}