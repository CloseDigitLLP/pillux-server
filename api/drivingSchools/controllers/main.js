module.exports = {
    list: async (req, res) => {
        try {
            let drivingSchools = await framework.services.drivingSchools.basic.fetch();
            if (!drivingSchools.length) {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: {}
                })
            } else {
                let data = drivingSchools.map((school) => ({
                    id: school.id,
                    name: school.name,
                    start_date: school.start_date,
                    valid_date: school.valid_date,
                    enabled: school.enabled
                })
                )
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
    single: async (req, res) => {
        try {
            let { id } = req.params;
            let drivingSchool = await framework.services.drivingSchools.basic.fetch(id);
            if (!drivingSchool.length) {
                res.status(404).json({
                    message: 'no record found!',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: drivingSchool
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
    create: async (req, res) => {
        try {
            let data = req.body;
            let drivingSchool = await framework.services.drivingSchools.basic.create(data);
            if (!drivingSchool) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: drivingSchool
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
    update: async (req, res) => {
        try {
            let { id } = req.params;
            let data = req.body;
            let drivingSchool = await framework.services.drivingSchools.basic.update(id, data);
            if (!drivingSchool) {
                res.status(400).json({
                    message: 'invalid data or record does not exists',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: drivingSchool
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
    delete: async (req, res) => {
        try {
            let { id } = req.params;
            let drivingSchool = await framework.services.drivingSchools.basic.delete(id);
            if (!drivingSchool) {
                res.status(400).json({
                    message: 'invalid data or record does not exists',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: drivingSchool
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