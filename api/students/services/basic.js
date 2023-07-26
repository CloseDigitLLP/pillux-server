const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = {
    fetch: async (id, where = {}, user) => {
        try {

            if(user?.usersRole?.name == 'Secrétaires'){
                 where['drivingschool_id'] = {
                    [Sequelize.Op.eq]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id)
                  }
              }

            if (id) { where.id = id }
            return await framework.models.students.findAll({
                include: [
                    {
                        model: framework.models.debit,
                        as: 'studentDebit',
                        require: false,
                        separate: true,
                        order: [['id', 'ASC']],
                        include: [
                            {
                                model: framework.models.debit_resolve,
                                as: 'debitId'
                            }
                        ]
                    },
                    {
                        model: framework.models.reservation,
                        as: 'studentReservation',
                        require: false,
                        separate: true,
                        order: [['id', 'ASC']]
                    },
                    {
                        model: framework.models.alerts,
                        as: 'studentAlerts',
                        separate: true,
                        require: false,
                        order: [['id', 'ASC']],
                        include: [
                            {
                                model: framework.models.alert_resolve,
                                as: 'alertId'
                            }
                        ]
                    },
                    {
                        model: framework.models.planning_exams,
                        as: 'studentExamPlanning',
                        separate: true,
                        require: false,
                        order: [['id', 'ASC']],
                    },
                    {
                        model: framework.models.student_skill,
                        as: "studentSkills",
                        separate: true,
                        require: false,
                        order: [['id', 'ASC']],
                        include: [
                            {
                                model: framework.models.skills,
                                as: 'skillId'
                            }
                        ]
                    },
                    {
                        model: framework.models.student_document,
                        as: "studentDocument",
                        separate: true,
                        order: [['id', 'ASC']],
                        attributes: ['id', 'student_id', 'type', 'document_id'],
                        include: [
                            {
                                model: framework.models.document,
                                as: "documentStudent",
                                attributes: ['id', 'path', 'type'],
                            }
                        ]
                    },
                    {
                        model: framework.models.driving_schools,
                        as: "drivingSchoolStudents",
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: framework.models.skills,
                                as: 'drivingSchoolSkills',
                                attributes: { exclude: ['created_at', 'updated_at'] }
                            }
                        ]
                    },
                    {
                        model: framework.models.student_payment,
                        as: "studentPayments",
                        separate: true,
                        order:[['id', 'ASC']],
                        where: {
                            student_formula_id: {
                                [Op.is]: null
                            }
                        }
                    },
                    {
                        model: framework.models.licences,
                        as: "licenceStudents",
                        attributes: ['id', 'name'],
                    },
                    {
                        model: framework.models.student_formula,
                        as: "studentFormula",
                        separate: true,
                        order:[['id', 'ASC']],
                        include: [
                            {
                                model: framework.models.formula,
                                as: 'formulaId',
                            },
                            {
                                model: framework.models.student_payment,
                                as: 'studentFormulaPayment',
                                separate: true,
                                order: [['id','ASC']]
                            }
                        ]
                    },
                    {
                        model: framework.models.comments,
                        as: "studentComments",
                        separate: true,
                        order: [['id', 'ASC']]
                    }
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
        try {
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