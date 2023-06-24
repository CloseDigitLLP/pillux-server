module.exports = {
    list: async (req, res) => {
        try {
            let permissions = await framework.services.permissions.basic.fetch();
            if (!permissions.length) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: permissions
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