const { Sequelize } = require("sequelize");

module.exports = {
    fetch: async (id, where = {}, user) => {
        try {

            if (user?.usersRole?.name == 'Secrétaires') {
                where["drivingschool_id"] = {
                    [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
                }
            }

            if (id) {
                where.id = id;
            }
            return await framework.models.planning_generals.findAll({
                include: [{
                    model: framework.models.users,
                    as: 'instructorGenerals',
                    require: true,
                }
                ],
                where,
            });
        } catch (error) {
            console.log('Error is ==>', error);
            return Promise.reject(error);
        }
    },
    create: async (data) => {
        try {
            return await framework.models.planning_generals.create(data);
        } catch (error) {
            console.log('Error is => ', error);
            return Promise.reject(error);
        }
    },
    delete: async (id) => {
        try {
            return await framework.models.planning_generals.destroy({
                where: {
                    id
                },
            });
        } catch (error) {
            console.log('Error is =>', error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.planning_generals.update(data, {
                where: {
                    id
                },
            });
        } catch (error) {
            console.log('Error is =>', error);
            return Promise.reject(error);
        }
    },
};