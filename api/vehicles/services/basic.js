const { Sequelize } = require("sequelize");

module.exports = {
    fetch: async (id, where = {}, user) => {
        try {

            if (user?.usersRole?.name == 'Secrétaires') {
                where["drivingschool_id"] = {
                    [Sequelize.Op.in]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
                }
            }

            if (id) { where.id = id }
            return await framework.models.vehicles.findAll({
                include: [
                    {
                        model: framework.models.users,
                        as: "instructorVehicles",
                        attributes: ["id", "firstname", "lastname", "email", "enabled"],
                    },
                    {
                        model: framework.models.vehicle_images,
                        as: "vehicleImage",
                        separate: true,
                        require: false,
                        order: [['id', 'ASC']],
                        attributes: { exclude: ['created_at', 'updated_at'] }
                    },
                    {
                        model: framework.models.vehicle_types,
                        as: "VehicleTypes",
                        require: false,
                        attributes: ["id", "type"]
                    },
                    {
                        model: framework.models.repairs,
                        as: 'vehicleRepairs',
                        require: false,
                        separate: true,
                        order: [['id', 'ASC']],
                        include: [
                            {
                                model: framework.models.repair_document,
                                as: 'repairDoc',
                                require: false,
                                attributes: { exclude: ['created_at', 'updated_at'] },
                                include: [
                                    {
                                        model: framework.models.document,
                                        as: 'documentRepair',
                                        attributes: { exclude: ['created_at', 'updated_at'] }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: framework.models.penalties,
                        as: "vehiclePenalty",
                        require: false,
                        separate: true,
                        order: [['id', 'ASC']],
                        include: [
                            {
                                model: framework.models.penalty_document,
                                as: 'penaltyDocs',
                                require: false,
                                attributes: { exclude: ['created_at', 'updated_at'] },
                                include: [
                                    {
                                        model: framework.models.document,
                                        as: 'documentPenalty',
                                        require: false,
                                        attributes: { exclude: ['created_at', 'updated_at'] }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: framework.models.driving_schools,
                        as: 'drivingSchoolVehicles',
                        attributes: ['id', 'name']
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
    },
    typeList: async () => {
        try {
            return await framework.models.vehicle_types.findAll({
                attributes: ["id", "type"]
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    }
}