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
        framework.functions.fileStorage.uploadFiles(req)(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            let data = req.body;
            if (!data) {
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
        framework.functions.fileStorage.uploadFiles(req)(req,res, (err) => {
            console.log('coming here...')
            if(err) {
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
    }
};
