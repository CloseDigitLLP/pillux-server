module.exports = {
    getAllUsers: async (req, res) => {
        let users = await framework.models.users.findAll({});
        res.json(users);
    }
}