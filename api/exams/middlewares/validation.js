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
    create: (req, res, next) => {
        let data = req.body;

        if (!Object.keys(data).length) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide a valid data"
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
    addStudents: (req, res, next) => {
        const { ids, exam_id } = req.body;

        if (!ids || !ids?.length>0 || !exam_id) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide valid data or id"
            })
        }

        next();
    },
    deleteStudents: (req, res, next) => {
        const { ids } = req.body;

        if (!ids || !ids?.length>0 ) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide valid data or id"
            })
        }

        next();
    }
};
