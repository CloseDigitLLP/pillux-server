const alert = require('../resources/alert.json');
const studentData = require('../resources/student.json');
const studentExams = require('../resources/student_examination.json');
const studentLicence = require('../resources/student_licence.json');
const studentFormula = require('../resources/student_formula.json');
const newStudentFormula = require('../resources/new_student_formula.json');
const studentComments = require('../resources/comment.json');
const paymentData = require('../resources/payment.json');
const newPaymentData = require('../resources/new_payment.json');
const drivingSchools = require('../resources/drivingschool.json');
let skills = require('../config/skills');
const users = require('../resources/user.json');
const userGroup = require('../resources/user_group.json');
const userDs = require('../resources/user_drivingschool.json');
const examins = require('../resources/examination.json');
const formulaData = require('../resources/formula.json');
const debitData = require('../resources/debit.json');

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
          start_date: ds.date_start,
          valid_date: ds.date_end,
          enabled: parseInt(ds.active) === 1 ? true : false,
        });
      }

      let data = await framework.models.driving_schools.bulkCreate(drivingschoolsData, {});
      let skillData = await framework.models.skills.bulkCreate(dsSkills, {});
      console.log('<== inserted data succefully ==>');
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
        });
      }
      await framework.models.users.bulkCreate(userData, {});
      await framework.models.user_drivingschool.bulkCreate(userDrivingSchool, {});
      console.log('user data synced');
    } catch (error) {
      console.log('Error: while data inserting on user and related tables ==>', error);
    }
  },
  studentDataSync: async () => {
    try {
      let existingStudents = [];
      let existingStudentsFormula = [];
      let oldExamOfStudents = [];
      let existingStudPayments = [];
      for (const student of studentData) {
        let licence = studentLicence.find((sl) => sl.student_id === student.id);
        existingStudents.push({
          id: student.id,
          // gender: student.gender, //NOTE - need to confirm client value of enum (0,1)
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
          licence_id: licence ? parseInt(licence.licence_id) : '',
        });
      }
      for (const plan of studentFormula) {
        existingStudentsFormula.push({
          id: parseInt(plan.id),
          student_id: parseInt(plan.student_id),
          formula_id: parseInt(plan.formula_id),
          quantity: parseInt(plan.quantity),
          date: plan.date,
        });
      }
      for (const newplan of newStudentFormula) {
        existingStudentsFormula.push({
          student_id: parseInt(newplan.student_id),
          formula_id: parseInt(newplan.formula_id),
          quantity: parseInt(newplan.quantity),
          date: plan.date,
        });
      }
      for (const oldExam of studentExams) {
        oldExamOfStudents.push({
          id: oldExam.id,
          student_id: oldExam.student_id,
          exam_id: oldExam.examination_id,
        });
      }
      for (const pay of paymentData) {
        let studentFormulas = studentFormula.find(
          (plan) => plan.formula_id === pay.formula_id && plan.student_id === pay.student_id
        );

        existingStudPayments.push({
          id: pay.id,
          type: pay.name,
          mode: pay.mode,
          amount: pay.price,
          numberbankcheck: pay.numbercheque,
          secretary_id: pay.receiver_id,
          student_formula_id: parseInt(studentFormulas.id),
        });
      }

      for (const newpay of newPaymentData) {
        let studentFormulas = studentFormula.find(
          (plan) => plan.formula_id === newpay.formula_id && plan.student_id === newpay.student_id
        );

        existingStudPayments.push({
          type: newpay.name,
          mode: newpay.mode,
          amount: newpay.price,
          numberbankcheck: newpay.numbercheque,
          secretary_id: newpay.receiver_id,
          student_formula_id: parseInt(studentFormulas.id),
        });
      } 
      // await framework.models.students.bulkCreate(existingStudents, {});
      // await framework.models.student_formula.bulkCreate(existingStudentsFormula, {});
      // await framework.models.planning_exams.bulkCreate(oldExamOfStudents, {});
      console.log(
        existingStudents,
        existingStudentsFormula,
        oldExamOfStudents,
        'students, student_formula and student_exams data synced'
      );
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
      console.log('exam data synced');
    } catch (error) {
      console.log('Error: while data inserting on exams tables ==>', error);
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
      await framework.models.formulas.bulkCreate(existingFormulas, {});
      console.log('formula data synced');
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
        });
      }

      console.log(exitsingDebits, 'debit data synced');
    } catch (error) {
      console.log('Error: while inseting data on debit table ==>', error);
    }
  },
};
