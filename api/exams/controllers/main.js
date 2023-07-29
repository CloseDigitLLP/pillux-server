module.exports = {
    list: async (req, res) => {
        try {
            let exams = await framework.services.exams.basic.fetch(null, {}, req?.user);
            if (!exams.length) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
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
            let exam = await framework.services.exams.basic.create(data);
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
    },
    update: async (req, res) => {
        try {
            let { id } = req.params;
            let data = req.body;
            let exam = await framework.services.exams.basic.update(id, data);
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
    delete: async (req, res) => {
        try {
            let { id } = req.params;
            let exam = await framework.services.exams.basic.delete(id);
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
    deleteStudents: async (req, res) => {
        try {
            let { ids } = req.body;
            let exam = await framework.services.exams.basic.deleteStudents(ids);
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
    addStudents: async (req, res) => {
        try {
            let { ids, exam_id } = req.body;
            let data = ids?.map((id) => {
                return {
                    student_id: id,
                    exam_id
                }
            })
            let exam = await framework.services.exams.basic.addStudents(data);
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
    }
}