let skills = require('../config/skills');
const alertsData = require('../resources/alert.json');
const studentData = require('../resources/student.json');
const studentExams = require('../resources/student_examination.json');
const studentLicence = require('../resources/student_licence.json');
const studentFormula = require('../resources/student_formula.json');
const newStudentFormula = require('../resources/new_student_formula.json');
const studentComments = require('../resources/comment.json');
const paymentData = require('../resources/payment.json');
const newPaymentData = require('../resources/new_payment.json');
const drivingSchools = require('../resources/drivingschool.json');
const users = require('../resources/user.json');
const userGroup = require('../resources/user_group.json');
const userDs = require('../resources/user_drivingschool.json');
const examins = require('../resources/examination.json');
const formulaData = require('../resources/formula.json');
const debitData = require('../resources/debit.json');
const planning = require('../resources/planning.json');
const moment = require('moment');

module.exports = {
  drivingSchoolsDataSync: async () => {
    try {
      let drivingschoolsData = [];
      let dsSkills = [];
      for (const ds of drivingSchools) {
        skills.forEach((skill) => {
          dsSkills.push({
            drivingschool_id: ds.id,
            name: skill.name,
            level: skill.level,
            position: skill.position,
          });
        });

        drivingschoolsData.push({
          id: parseInt(ds.id),
          name: ds.name,
          start_date: moment.utc(ds.date_start),
          valid_date: moment.utc(ds.date_end),
          enabled: parseInt(ds.active) === 1 ? true : false,
        });
      }

      await framework.models.driving_schools.bulkCreate(drivingschoolsData, {});
      await framework.models.skills.bulkCreate(dsSkills, {});
    } catch (error) {
      console.log('while inserting data on drivingschool table, Error: ==>', error);
    }
  },
  userDataSync: async () => {
    try {
      let userData = [];
      let userDrivingSchool = userDs;
      for (const user of users) {
        let roles = userGroup.filter((item) => item.user_id === user.id).map((ur) => ur.group_id);
        let roleId;
        if (roles.includes('3')) {
          roleId = 3;
        } else if (roles.includes('2')) {
          roleId = 2;
        } else {
          roleId = 1;
        }

        userData.push({
          id: parseInt(user.id),
          email: user.email || user.username || user.username_canonical,
          firstname: user.firstname,
          lastname: user.lastname,
          salt: user.salt,
          password: 'pillux@123',
          last_login: user.last_login,
          confirmation_token: user.confirmation_token,
          password_requested_at: user.password_requested_at,
          role_id: roleId,
          enabled: parseInt(user.enabled) || false,
        });
      }
      await framework.models.users.bulkCreate(userData, {});
      await framework.models.user_drivingschool.bulkCreate(userDrivingSchool, {});
    } catch (error) {
      console.log('Error: while data inserting on user and related tables ==>', error);
    }
  },
  studentDataSync: async () => {
    try {
      let existingStudents = [];
      let existingStudentsFormula = [];
      let existingStudentComments = [];
      for (const student of studentData) {
        let licence = studentLicence.find((sl) => sl.student_id === student.id);
        existingStudents.push({
          id: student.id,
          gender: student.gender === '0' ? 'Féminin' : 'mâle',
          lastname: student.lastname,
          firstname: student.firstname,
          birthday: student.birthday,
          department: student.department,
          email: student.email,
          mobile: student.mobile,
          address: student.address,
          place_meet: student.location_meet,
          neph: student.neph,
          status: student.active === '1' ? true : false,
          drivingschool_id: student.drivingschool_id,
          licence_id: licence?.licence_id ? parseInt(licence?.licence_id) : 1,
        });
      }
      for (const plan of studentFormula) {
        existingStudentsFormula.push({
          id: parseInt(plan.id),
          student_id: parseInt(plan.student_id),
          formula_id: parseInt(plan.formula_id),
          quantity: parseInt(plan.quantity),
          date: plan.date,
          created_at: moment(plan.date).format('YYYY-MM-DD') + ' 12:00:00',
        });
      }
      for (const newplan of newStudentFormula) {
        existingStudentsFormula.push({
          student_id: parseInt(newplan.student_id),
          formula_id: parseInt(newplan.formula_id),
          quantity: parseInt(newplan.quantity),
          date: newplan.date,
          created_at: moment(newplan.date).format('YYYY-MM-DD') + ' 12:00:00',
        });
      }
      for (const comment of studentComments) {
        existingStudentComments.push({
          id: comment.id,
          comment: comment.commentary,
          student_id: comment.student_id,
          user_id: comment.user_id,
          created_at: moment(comment.date).format('YYYY-MM-DD') + ' 12:00:00',
        });
      }
      await framework.models.students.bulkCreate(existingStudents, {});
      await framework.models.student_formula.bulkCreate(existingStudentsFormula, {});
      await framework.models.comments.bulkCreate(existingStudentComments, {});
    } catch (error) {
      console.log('Error: while data inserting on student and related tables ==>', error);
    }
  },
  examDataSync: async () => {
    try {
      let examsData = [];
      for (const exam of examins) {
        examsData.push({
          id: exam.id,
          date_start: exam.date,
          instructor_id: exam.instructor_id,
          number_of_students: exam.numbers,
          name: exam.name,
          meeting_place: exam.location_meet,
          location: exam.location,
          type_of_permission: exam.licence,
        });
      }
      await framework.models.exams.bulkCreate(examsData, {});
    } catch (error) {
      console.log('Error: while data inserting on exams tables ==>', error);
    }
  },
  studentOldExamDataSync: async () => {
    try {
      let oldExamOfStudents = [];
      for (const oldExam of studentExams) {
        oldExamOfStudents.push({
          id: oldExam.id,
          student_id: oldExam.student_id,
          exam_id: oldExam.examination_id,
        });
      }
      await framework.models.planning_exams.bulkCreate(oldExamOfStudents, {});
    } catch (error) {
      console.log('Error: while data inserting on student_exam table ==>', error);
    }
  },
  studentPaymentDataSync: async () => {
    try {
      let existingStudPayments = [];
      let formulasData = await framework.models.student_formula.findAll({});
      for (const pay of paymentData) {
        let studentFormulas = {};

        for (const plan of formulasData) {
          if (pay.student_id == plan.student_id && pay.formula_id == plan.formula_id) {
            studentFormulas = plan;
            break;
          }
        }
        let type, mode;

        if (pay.name === '0') {
          type = '1er versement';
        } else if (pay.name === '1') {
          type = '2eme versement';
        } else if (pay.name === '2') {
          type = '3eme versement';
        } else {
          type = 'versement';
        }

        if (pay.mode === '0') {
          mode = 'Virement';
        } else if (pay.mode === '1') {
          mode = 'Chèque';
        } else if (pay.mode === '2') {
          mode = 'Espéces';
        } else if (pay.mode === '3') {
          mode = 'Chéque à encaissement programmé';
        } else if (pay.mode === '4') {
          mode = 'Chéque de caution';
        }

        existingStudPayments.push({
          id: pay.id,
          type: type,
          mode: mode,
          amount: pay.price,
          numberbankcheck: pay.numbercheque,
          secretary_id: parseInt(pay.receiver_id),
          student_id: pay.student_id,
          formula_id: pay.formula_id,
          student_formula_id: studentFormulas.id ? parseInt(studentFormulas.id) : null,
          created_at: moment(pay.date).format('YYYY-MM-DD') + ' 12:00:00',
        });
      }
      for (const newpay of newPaymentData) {
        let studentFormulas = {};

        let formula = newStudentFormula.find((studFormula) => studFormula.student_id == newpay.student_id);
        for (const plan of formulasData) {
          if (newpay.student_id == plan.student_id && formula.formula_id == plan.formula_id) {
            studentFormulas = plan;
            break;
          }
        }

        let type, mode;

        if (newpay.name === '0') {
          type = '1er versement';
        } else if (newpay.name === '1') {
          type = '2eme versement';
        } else if (newpay.name === '2') {
          type = '3eme versement';
        } else {
          type = 'versement';
        }

        if (newpay.mode === '0') {
          mode = 'Virement';
        } else if (newpay.mode === '1') {
          mode = 'Chèque';
        } else if (newpay.mode === '2') {
          mode = 'Espéces';
        } else if (newpay.mode === '3') {
          mode = 'Chéque à encaissement programmé';
        } else if (newpay.mode === '4') {
          mode = 'Chéque de caution';
        }

        existingStudPayments.push({
          type: type,
          mode: mode,
          amount: newpay.price,
          numberbankcheck: newpay.numbercheque,
          secretary_id: newpay.receiver_id,
          student_id: newpay.student_id,
          formula_id: parseInt(formula?.formula_id),
          student_formula_id: studentFormulas.id ? parseInt(studentFormulas.id) : null,
          created_at: moment(newpay.date).format('YYYY-MM-DD') + ' 12:00:00',
        });
      }
      await framework.models.student_payment.bulkCreate(existingStudPayments, {});
    } catch (error) {
      console.log('Error: while data inserting on student_payment table ==>', error);
    }
  },
  formulaDataSync: async () => {
    try {
      let existingFormulas = [];
      for (const formula of formulaData) {
        existingFormulas.push({
          id: formula.id,
          drivingschool_id: formula.drivingschool_id,
          name: formula.name,
          hour: formula.hour,
          price: formula.price,
        });
      }
      await framework.models.formula.bulkCreate(existingFormulas, {});
    } catch (error) {
      console.log('Error: while data inserting on exams tables ==>', error);
    }
  },
  debitDataSync: async () => {
    try {
      let exitsingDebits = [];
      for (const debit of debitData) {
        exitsingDebits.push({
          id: debit.id,
          student_id: debit.student_id,
          money_left: debit.money,
          status: debit.enable === '1' ? true : false,
          date: debit.date,
          created_at: moment(debit.date).format('YYYY-MM-DD') + ' 12:00:00',
        });
      }
      await framework.models.debit.bulkCreate(exitsingDebits, {});
    } catch (error) {
      console.log('Error: while inseting data on debit table ==>', error);
    }
  },
  alertDataSync: async () => {
    try {
      let oldAlerts = [];

      for (const alert of alertsData) {
        oldAlerts.push({
          id: alert.id,
          student_id: alert.student_id,
          status: alert.enable === '1' ? true : false,
          resume: alert.resume,
          created_at: moment(alert.date).format('YYYY-MM-DD') + ' 12:00:00',
        });
      }
      await framework.models.alerts.bulkCreate(oldAlerts, {});
    } catch (error) {
      console.log('Error: while inseting data on alert table ==>', error);
    }
  },
  planningDataSync: async () => {
    try {
      let oldPlanningData = [];

      for (const plan of planning) {
        let type, gearbox;
        if (plan.type === '0') {
          type = 'Conduite';
        } else if (plan.type === '1') {
          type = 'Examen';
        } else if (plan.type === '2') {
          type = 'Autres';
        } else {
          type = '';
        }
        if (plan.boite === '0') {
          gearbox = 'boite manuelle';
        } else if (plan.boite === '1') {
          gearbox = 'Boite Auto';
        } else {
          gearbox = 'Moto';
        }
        oldPlanningData.push({
          id: plan.id,
          student_id: plan.student_id,
          instructor_id: plan.instructor_id,
          start_horary: moment.utc(plan.start_horary, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
          end_horary: moment.utc(plan.end_horary, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
          type: type,
          gearbox: gearbox,
          motif: plan.reason,
        });
      }
      await framework.models.planning_generals.bulkCreate(oldPlanningData, {});
    } catch (error) {
      console.log('Error: while inseting data on alert table ==>', error);
    }
  },
  studentsDateCodeSync: async () => {
    try {
      let studentsData = await framework.models.students.findAll({
        attributes: [
            'id',
            'date_code'
        ],
        include: [
          {
            model: framework.models.student_formula,
            as: "studentFormula",
            separate: true,
            order:[['id', 'ASC']],
            include: [
                {
                    model: framework.models.student_payment,
                    as: 'studentFormulaPayment',
                    separate: true,
                    order: [['id','ASC']]
                }
            ]
        }],
        order: [['id', 'DESC']]
    });

    studentsData = studentsData?.map((student) => {
      return {
        id: student?.id,
        date_code: student?.studentFormula?.[0]?.studentFormulaPayment?.[0]?.created_at || null
      }
    })

    await framework.models.students.bulkCreate(studentsData, {
      updateOnDuplicate: ['date_code']
    })

    } catch (error) {
      console.log('Error: while updating data on students table ==>', error);
    }
  },

};
