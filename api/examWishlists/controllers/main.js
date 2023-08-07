module.exports = {
    list: async (req, res) => {
        try {
            let exams = await framework.services.examWishlists.basic.fetch(null, {}, req?.user);
            if (!exams.length) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
                // let data = drivingSchools.map((school) => ({
                //     id: school.id,
                //     name: school.name,
                //     start_date: school.start_date,
                //     valid_date: school.valid_date,
                //     enabled: school.enabled
                // })
                // )
                res.status(200).json({
                    message: '',
                    error: false,
                    data: exams
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
    update: async (req, res) => {
        try {
            let { id } = req.params;
            let data = req.body;
            let exam = await framework.services.examWishlists.basic.update(id, data);
            if (!exam) {
                res.status(400).json({
                    message: 'invalid data or record does not exists',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: exam
                })
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                message: error?.message,
                error: true,
                data: error
            })
        }
    },
    create: async (req, res) => {
        try {
            let data = req.body;
            let exam = await framework.services.examWishlists.basic.create(data);
            if (!exam) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: exam
                })
            }
        } catch (error) {
            console.log("error =>", error);
            res.status(500).json({
                message: error?.message,
                error: true,
                data: error
            })
        }
    }
}