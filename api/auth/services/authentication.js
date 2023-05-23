module.exports = {
    login: async (email, password) => {
        try {       
            return await framework.models.users.findOne({
                where: {
                    email,
                    password
                },
                attributes: ['email', 'username', 'roles']
            })
        } catch(error) {
            console.log(error)
            return Promise.reject(error)
        }
    }
}