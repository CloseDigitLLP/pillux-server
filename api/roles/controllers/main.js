module.exports = {
    list: async (req, res) => {
        try {
            let roles = await framework.services.roles.basic.fetch();
            if (!roles.length) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: roles
                });
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                messagae: error?.message,
                error: true,
                data: error
            })
        }
    }
}