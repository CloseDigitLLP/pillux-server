module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.students.findAll({
                // include: [
                //     'studentAlerts',
                //     'studentDebit',
                //     'drivingSchoolStudents',
                //     'studentReservation',
                //     'studentExams',
                //     {
                //         model: framework.models.student_skill,
                //         as: "studentSkills",
                //         include: [
                //             {
                //                 model: framework.models.skills,
                //                 as: 'skillId'
                //             }
                //         ]
                //     },
                //     {
                //         model: framework.models.student_document,
                //         as: "studentDocument",
                //         include: [
                //             {
                //                 model: framework.models.document,
                //                 as: "documentStudent"
                //             }
                //         ]
                //     },
                //     {
                //         model: framework.models.student_formula,
                //         as: "studentFormula",
                //         include: [
                //             {
                //                 model: framework.models.formula,
                //                 as: 'formulaId',
                //             }
                //         ]
                //     }
                // ],
                attributes: [
                    'id', 
                    'gender',
                    'lastname',
                    'firstname',
                    'mobile',
                    'address',
                    'neph',
                    'date_code'
                ],
                where
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    create: async (data) => {
        try {
            console.log(data), '<== data was to stored in database service file';
            return await framework.models.students.create(data);
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.students.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
    delete: async (id) => {
        try {
            return await framework.models.students.destroy({ where: { id } });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    }
}