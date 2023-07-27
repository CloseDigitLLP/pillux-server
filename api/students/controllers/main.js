module.exports = {
    list: async (req, res) => {
        try {
            let students = await framework.services.students.basic.fetchAll(req?.user);
            if (!students) {
                res.status(200).json({
                    message: 'no records found!',
                    error: false,
                    data: []
                })
            } else {
                const data = students.map((student) => {
                    return {
                        id: student.id,
                        gender: student.gender,
                        lastname: student.lastname,
                        firstname: student.firstname,
                        mobile: student.mobile,
                        address: student.address,
                        neph: student.neph,
                        date_code: student.date_code,
                        drivingschool_id : student.drivingschool_id,
                    }
                })
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
            let student = await framework.services.students.basic.fetch(id);
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
            let documentsToBulkCreate = []
            let newStudent = await framework.services.students.basic.create(studentData);
            if (req.files && req.files.length > 0) {
                req.files.forEach((file) => {
                    documentsToBulkCreate.push({
                        student_id: newStudent.id,
                        type: file.fieldname,
                        documentStudent: {
                            path: file.path,
                            type: file.mimetype
                        }
                    })
                });
            }
            if (!newStudent) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                await framework.services.students.updateStudent.updateFileUploads(documentsToBulkCreate);
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
            let { studentData } = req.body;
            studentData = JSON.parse(studentData);
            let documentsToBulkCreate = []
            let documentsToBulkUpdate = []
            for (let file of req.files) {
                const docName = file.fieldname
                let existingDoc = studentData?.docs?.[docName]
                if (existingDoc && existingDoc.id) {
                    documentsToBulkUpdate.push({
                        ...existingDoc,
                        documentStudent: {
                            ...existingDoc.documentStudent,
                            path: file.path,
                            type: file.mimetype
                        }
                    })
                } else {
                    documentsToBulkCreate.push({
                        student_id: parseInt(id),
                        type: docName,
                        documentStudent: {
                            path: file.path,
                            type: file.mimetype
                        }
                    })
                }
            }
            let student = await framework.services.students.basic.update(id, studentData);
            await framework.services.students.updateStudent.updateFileUploads(documentsToBulkCreate);
            await framework.services.students.updateStudent.updateFileUploads(documentsToBulkUpdate);
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
    createComments: async (req, res) => {
        try {
            let data = req.body
            let comment = await framework.services.students.updateStudent.updateComment(data);
            if (!comment) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: comment
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
    createFormula: async (req, res) => {
        try {
            let data = req.body
            let formula = await framework.services.students.updateStudent.addFormula(data);
            if (!formula) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: formula
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
    deleteFormula: async (req, res) => {
        try {
            let { id } = req.params
            let formula = await framework.services.students.updateStudent.deleteFormula(id);
            if (!formula) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: formula
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
    createPayment: async (req, res) => {
        try {
            let data = req.body
            let payment = await framework.services.students.updateStudent.addPayment(data);
            if (!payment) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: payment
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
    createSkills: async (req, res) => {
        try {
            let data = req.body
            let skills = await framework.services.students.updateStudent.addUpdateSKill(data);
            if (!skills.length) {
                res.status(400).json({
                    message: 'invalid data',
                    error: true,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: '',
                    error: false,
                    data: skills
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
    updateLicencePermit : async (req,res) => {
        try {
            let data = req.body;
            let { id } = req.params;
            console.log(data,id,"<<<<<<< Data and Id");
            let licencePermit = await framework.services.students.updateStudent.updateLicencePermit(id,data);
            if (!licencePermit.length){
                res.status(400).json({
                    message:"Invalid Data",
                    error:true,
                    data:{}
                })
            }else{
                res.status(200).json({
                    message:"",
                    error:false,
                    data:licencePermit
                })
            }

        } catch (error) {
            console.log("Error is => ",error);
            res.status(500).json({
                message: error?.message,
                error: true,
                data: error
            })
        }
    }
}