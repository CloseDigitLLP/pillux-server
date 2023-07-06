module.exports = {
    fetch: (req, res, next) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request"
            })
        }

        next();
    },
    update: (req, res, next) => {
        const { id } = req.params;
        let data = req.body;

        if (!id || !data) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide valid data or id"
            })
        }

        next();
    },
};