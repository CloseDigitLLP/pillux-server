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
    delete: (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide valid data or id"
            })
        }
        next();
    },
    create: (req, res, next) => {
        framework.functions.fileStorage.uploadFiles()(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: err.message, error: true, data: er })
            }
        })
        let data = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide a valid data"
            })
        }
        next();
    },
    update: (req, res, next) => {
        framework.functions.fileStorage.uploadFiles()(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: err.message, error: true, data: er })
            }
        })
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
    }
};
