module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.users.findAll({
                include: [
                    {
                        model: framework.models.roles,
                        as: 'usersRole',
                        attributes: ['id', 'name']
                    },
                    {
                        model: framework.models.user_drivingschool,
                        as: 'userDrivingschool',
                        attributes: ['id', 'user_id', 'drivingschool_id'],
                        include: [
                            {
                                model: framework.models.driving_schools,
                                as: 'drivingSchoolUser',
                                attributes: ['id', 'name']
                            }
                        ]
                    },
                    {
                        model: framework.models.vehicles,
                        as: 'instructorVehicles',
                        attributes: ['id', 'name', 'type', 'drivingschool_id', 'immatriculation']
                    },
                    {
                        model: framework.models.user_group,
                        as: 'userGroup',
                        attributes: ['id', 'user_id', 'group_id'],
                        include: [
                            {
                                model: framework.models.group,
                                as: 'groupUser',
                                attributes: ['id', 'role', 'name'],
                            }
                        ]
                    },
                    {
                        model: framework.models.user_permissions,
                        as: 'userPermissions',
                        attributes: ['id','user_id','permission_id'],
                        include: [
                            {
                                model: framework.models.permission,
                                as: 'permissionUser',
                                attributes: ['id', 'type']
                            }
                        ]
                    },
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
            return await framework.models.users.create(data);
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.users.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
    delete: async (id) => {
        try {
            return await framework.models.users.destroy({ where: { id } });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    }
}