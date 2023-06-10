module.exports={
    create: (req, res, next) => {
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
}