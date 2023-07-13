module.exports = {
    login: async (email, password) => {
        try {
            return await framework.models.users.findOne({
                where: {
                    email,
                    password
                },
                attributes: ['email', 'firstname', 'lastname', 'id'],
                include: [
                    { model: framework.models.roles, as: "usersRole", attributes: ['name'] },
                    { model: framework.models.user_drivingschool, as: "userDrivingschool" }
                ]
            })
        } catch (error) {
            console.log(error)
            return Promise.reject(error)
        }
    }
}