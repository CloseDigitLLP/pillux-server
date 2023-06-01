module.exports={
    list: async (req, res) => {
        try {
            let alerts = await framework.services.alerts.basic.fetch()
            if (!alerts.length) {
                res.status(404).json({
                    message: 'no records found!',
                    error: true,
                    data: {}
                })
            } else {
                let data = alerts;
                console.log(data);
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