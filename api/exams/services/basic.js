module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.exams.findAll({
                include: [
                    {
                        model: framework.models.driving_schools,
                        as: 'drivingSchoolExams',
                        attributes: { exclude: ['created_at', 'updated_at'] }
                    },
                    {
                        model: framework.models.users,
                        as: 'instructorExam'
                    },
                    {
                        model: framework.models.planning_exams,
                        as: 'studentExam',
                        include: {
                            model: framework.models.students,
                            as: 'studentExamPlanning',
                            attributes: ['id', 'firstname', 'lastname', 'email']
                        }
                    }
                ],
                where
            });


            // return await framework.models.planning_exams.findAll({
            //     include: [
            //         {
            //             model: framework.models.exams,
            //             as: 'studentExam',
            //             include: [
            //                 {
            //                     model: framework.models.driving_schools,
            //                     as: 'drivingSchoolExams',
            //                     attributes: { exclude: ['created_at', 'updated_at'] }
            //                 },
            //                 {
            //                     model: framework.models.users,
            //                     as: 'instructorStudent'
            //                 },
            //             ]
            //         },
            //         {
            //             model: framework.models.students,
            //             as: 'studentExamPlanning',
            //             attributes: ['id', 'gender', 'lastname', 'firstname', 'email', 'mobile', 'address', 'status'],
            //         },
            //         {
            //             model: framework.models.licences,
            //             as: 'licenceExams',
            //             attributes: { exclude: ['created_at', 'updated_at'] }
            //         },
            //     ],
            //     where
            // });


            // return await framework.models.planning_exams.findAll({
            //     include: [
            //         {
            //             model: framework.models.driving_schools,
            //             as: 'drivingSchoolExams',
            //             attributes: { exclude: ['created_at', 'updated_at'] }
            //         },
            //         {
            //             model: framework.models.students,
            //             as: 'studentExams',
            //             attributes: [ 'id', 'gender', 'lastname', 'firstname', 'email', 'mobile', 'address', 'status' ],
            //         },
            //         {
            //                 model: framework.models.users,
            //                 as: 'instructorStudent'
            //         },
            //         {
            //             model: framework.models.licences,
            //             as: 'licenceExams',
            //             attributes: { exclude: ['created_at', 'updated_at'] }
            //         },
            //         {
            //             model: framework.models.answers,
            //             as: 'eventId',
            //             attributes: { exclude: ['created_at', 'updated_at'] }
            //         }
            //     ],
            //     where
            // });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    create: async (data) => {
        try {
            console.log(data)
            return await framework.models.exams.create(data);
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.exams.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
    delete: async (id) => {
        try {
            return await framework.models.exams.destroy({ where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
    deleteStudents: async (ids) => {
        try {
            return await framework.models.planning_exams.destroy({ where: { id: ids } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    },
    addStudents: async (data) => {
        try {
            return await framework.models.planning_exams.bulkCreate(data);
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    }
}