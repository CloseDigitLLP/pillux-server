module.exports = {
    login: async (req, res) => {
        let { email } = req.body
        let user = await framework.services.users.get.user({ email })

        if(!user) {
            return res.status(404).send({ message: 'User not found' })
        }

        user = JSON.parse(JSON.stringify(user))

        let token = framework.functions.jwt.getToken(user)

        return res.send({ user, token })
    }
}