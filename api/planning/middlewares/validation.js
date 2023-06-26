module.exports = {
    create: async (req, res, next) => {
        let data = req.body;
        if (!data) {
            return res.status(400).json({
                message: 'Invalid Request',
                error: true,
                data: 'make a proper request, provide valid data ',
            });
        }
        next();
    },
    delete: async (req, res, next) => {
        let {
            id
        } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Invalid Request',
                error: true,
                data: 'make a proper request, provide valid data or id',
            });
        }

        next();
    },
    update: async (req, res, next) => {
        let {
            id
        } = req.params;
        let data = req.body;
        if (!data || !id) {
            return res.status(400).json({
                message: 'Invalid Request',
                error: true,
                data: 'make a proper request and include all the required fields in body.',
            });
        }

        next();
    },
};