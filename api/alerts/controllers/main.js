module.exports={
    list: async (req, res) => {
        try {

            let user = req?.user || '';

            let alerts = await framework.services.alerts.basic.fetch(user)
            if (!alerts.length) {
                res.status(200).json({
                    message: 'no records founds!',
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