module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.planning_exams.findAll({
                include: [
                    {
                        model: framework.models.driving_schools,
                        as: 'drivingSchoolExams',
                        attributes: { exclude: ['created_at', 'updated_at'] }
                    },
                    {
                        model: framework.models.students,
                        as: 'studentExams',
                        attributes: [ 'id', 'gender', 'lastname', 'firstname', 'email', 'mobile', 'address', 'status' ]
                    },
                    {
                        model: framework.models.licences,
                        as: 'licenceExams',
                        attributes: { exclude: ['created_at', 'updated_at'] }
                    },
                    {
                        model: framework.models.answers,
                        as: 'eventId',
                        attributes: { exclude: ['created_at', 'updated_at'] }
                    }
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
            return await framework.models.driving_schools.create(data);
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    update: async (id, data) => {
        try {
            return await framework.models.driving_schools.update(data, { where: { id } });
        } catch (error) {
            console.log("error=>", error);
            return Promise.reject(error);
        }
    }
}