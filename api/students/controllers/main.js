module.exports = {
    list: async (req, res) => {
        try {
            let students = await framework.services.students.basic.fetch();
            console.log("response from service for list ==>", students);
            if (!students) {
                res.status(404).json({
                    message: 'no records found!',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: 'false',
                    data: students
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
            let student = await framework.services.students.basic.fetch(id);
            console.log("response from service for single ==>", student);
            if (!student) {
                res.status(404).json({
                    message: 'no record found!',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: student
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
            let { studentData } = req.body;
            studentData = JSON.parse(studentData);
            if (req.files && req.files.length > 0) {
                console.log("inside files students is ===>", studentData);
                studentData.docs = {};
                req.files.forEach((file) => {
                    console.log(file);
                    studentData.docs[file.fieldname] = {
                        filename: file.filename,
                        path: file.path,
                        type: file.mimetype
                    };
                });
            }
            
            console.log(studentData, '<== before adding database, studentdata with filename and path');
            let newStudent = await framework.services.students.basic.create(studentData);
            console.log("response from service for create ==>", newStudent);
            if (!newStudent) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: newStudent
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
            let student = await framework.services.students.basic.update(id, data);
            console.log("response from service for update ==>", student);
            if (!student) {
                res.status(400).json({
                    message: 'invalid data or record does not exists',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: student
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
            let student = await framework.services.students.basic.delete(id);
            console.log("response from service for delete ==>", student);
            if (!student) {
                res.status(400).json({
                    message: 'invalid data or record does not exists',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: student
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