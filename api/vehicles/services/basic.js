module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.vehicles.findAll({
                include: [
                    {
                        model: framework.models.users,
                        as: "instructorVehicles",
                        attributes: [ "id", "username", "email", "enabled" ]
                    }
                ],
                where
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    create: async (data) => {
        try {
            
            const vehicle = await framework.models.vehicles.create(
                data
            );

            return vehicle;
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.vehicles.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
    delete: async (id) => {
        try {
            return await framework.models.vehicles.destroy({ where: { id } });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    }
}