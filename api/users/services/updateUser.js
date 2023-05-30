module.exports = {
    addUserGroup: async (data) => {
        return await framework.models.user_group.create(data);
    },
    addUserDrivingSchool: async (data) => {
        return await framework.models.user_drivingschool.create(data);
    },
    addUpdateUserPermission: async (userPermissions) => {
        return await framework.models.user_permissions.bulkCreate(userPermissions, {
            updateOnDuplicate: ['permission_id']
        })
    }
}