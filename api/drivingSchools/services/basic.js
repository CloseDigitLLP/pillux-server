const { Sequelize } = require("sequelize");

module.exports = {
    fetch: async (id, where = {}, user) => {
        try {

            if (user?.usersRole?.name !== 'Super Gérants') {
                where["id"] = {
                    [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
                }
            }

            if (id) { where.id = id }
            return await framework.models.driving_schools.findAll({
                where
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    create: async (data) => {
        try {
            return await framework.models.driving_schools.create(data);
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.driving_schools.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
    delete: async (id) => {
        try {
            return await framework.models.driving_schools.destroy({ where: { id } });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    }
}