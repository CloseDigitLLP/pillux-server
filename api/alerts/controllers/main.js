module.exports={
    list: async (req, res) => {
        try {
            let alerts = await framework.services.alerts.basic.fetch()
            if (!alerts.length) {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: []
                })
            } else {
                let data = alerts;
                res.status(200).json({
                    message: '',
                    error: false,
                    data: data
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
    },
}