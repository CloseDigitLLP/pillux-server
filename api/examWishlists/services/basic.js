const { Sequelize } = require("sequelize");

module.exports = {
    fetch: async (id, where = {}, user) => {
        try {

            let rolesCondition = {}
            if(user?.usersRole?.name == 'Secrétaires'){
                rolesCondition = {
                  drivingschool_id: {
                    [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
                  }
                }
              }

            if (id) { where.id = id }
            return await framework.models.exam_wishlist.findAll({
                include: [
                    {
                        model: framework.models.students,
                        as: 'studentExamWishlist',
                        attributes: ['id', 'firstname', 'lastname', 'email'],
                        where: { ...rolesCondition }
                    },
                    {
                        model: framework.models.users,
                        as: 'instructorExamWishlist'
                    }
                ],
                where
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.exam_wishlist.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
}