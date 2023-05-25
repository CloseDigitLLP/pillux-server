module.exports = {
    fetch: async (id, where = {}) => {
        try {
            if (id) { where.id = id }
            return await framework.models.students.findAll({
                include: [
                    // 'studentAlerts',
                    // 'studentDebit',
                    // 'studentReservation',
                    // 'studentExams',
                    // {
                    //     model: framework.models.student_skill,
                    //     as: "studentSkills",
                    //     include: [
                    //         {
                    //             model: framework.models.skills,
                    //             as: 'skillId'
                    //         }
                    //     ]
                    // },
                    {
                        model: framework.models.student_document,
                        as: "studentDocument",
                        attributes: ['id','student_id','type','document_id'],
                        include: [
                            {
                                model: framework.models.document,
                                as: "documentStudent",
                                attributes: ['id','path','type'],
                            }
                        ]
                    },
                    {
                        model: framework.models.driving_schools,
                        as: "drivingSchoolStudents",
                        attributes: ['id', 'name']
                    }
                    // {
                    //     model: framework.models.student_formula,
                    //     as: "studentFormula",
                    //     include: [
                    //         {
                    //             model: framework.models.formula,
                    //             as: 'formulaId',
                    //         }
                    //     ]
                    // }
                ],
                attributes: [
                    'id',
                    'gender',
                    'lastname',
                    'firstname',
                    'mobile',
                    'address',
                    'neph',
                    'date_code',
                    'birthday',
                    'department',
                    'place_birthday',
                    'email',
                    'place_meet',
                    'status',
                    'drivingschool_id',
                    'docsType'
                ],
                where
            });
        } catch (error) {
            console.log("error =>", error);
            return Promise.reject(error);
        }
    },
    create: async (data) => {
        const t = await framework.connection.transaction();
        try {
            const {
                photo_id,
                gender,
                lastname,
                firstname,
                birthday,
                department,
                place_birthday,
                email,
                mobile,
                address,
                place_meet,
                neph,
                status,
                drivingschool_id,
                date_code,
                docsType,
                docs
            } = data;
            
            const student = await framework.models.students.create(
                {
                    photo_id,
                    gender,
                    lastname,
                    firstname,
                    birthday,
                    department,
                    place_birthday,
                    email,
                    mobile,
                    address,
                    place_meet,
                    neph,
                    status,
                    drivingschool_id,
                    date_code,
                    docsType
                },
                { transaction: t }
            );

            const documentEntries = Object.entries(docs);
            const studentDocEntries = documentEntries.map(([documentType, documentData]) => ({
                type: documentType,
                student_id: student.id,
                document: {
                    path: documentData.path,
                    type: documentData.type
                }
            }));

            const createdDocuments = await framework.models.document.bulkCreate(
                studentDocEntries.map((entry) => entry.document),
                { transaction: t }
            );

            const studentDocumentEntries = studentDocEntries.map((entry, index) => ({
                student_id: student.id,
                document_id: createdDocuments[index].id,
                type: entry.type
            }));

            await framework.models.student_document.bulkCreate(studentDocumentEntries, {
                transaction: t
            });

            await t.commit();

            return student;
        } catch (error) {
            console.log("error =>", error);
            await t.rollback();
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