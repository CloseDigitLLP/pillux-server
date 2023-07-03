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
        framework.functions.fileStorage.uploadFiles('uploads/students')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            let data = req.body;
            if (Object.keys(data).length === 0) {
                return res.status(400).json({
                    message: 'Invalid request',
                    error: true,
                    data: "make a proper request, provide a valid data"
                })
            }

            next();
        });

    },
    update: (req, res, next) => {
        framework.functions.fileStorage.uploadFiles('uploads/students')(req, res, (err) => {
            console.log('coming here...')
            if (err) {
                return res.status(400).json({ error: err.message });
            }
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
        })
    },
    createComment: (req, res, next) => {
        let data = req.body;
        if (!data.student_id || !data.comment) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide a valid data"
            })
        }
        
        next();
    },
    createFormula: (req, res, next) => {
        let data = req.body;
        if (!data.student_id || !data.formula_id || !data.quantity) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide a valid data"
            })
        }
        
        next();
    },
    createPayment: (req, res, next) => {
        let data = req.body;
        if (!data.student_formula_id || !data.type || !data.mode || !data.amount) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide a valid data"
            })
        }
        
        next();
    },
    createSkills: (req, res, next) => {
        let data = req.body;
        if (!data.length) {
            return res.status(400).json({
                message: 'Invalid request',
                error: true,
                data: "make a proper request, provide a valid data"
            })
        }

        next();
    },
    
};
