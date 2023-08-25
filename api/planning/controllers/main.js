const moment = require('moment/moment');

module.exports = {
  list: async (req, res) => {
    try {
      let plannings = await framework.services.planning.basic.fetch(null, {}, req?.user);
      if (!plannings) {
        res.status(200).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: plannings,
        });
      }
    } catch (error) {
      console.log('Error is => ', error);
      res.status(500).json({
        message: error?.message || error,
        error: true,
        data: {},
      });
    }
  },
  create: async (req, res) => {
    try {
      let planningData = req.body;
      console.log(planningData);
      let newPlanning = await framework.services.planning.basic.create(planningData);
      if (!newPlanning) {
        res.status(400).json({
          message: "Can't be Added",
          error: true,
          data: {},
        });
      } else {
        res.status(201).json({
          message: '',
          error: false,
          data: newPlanning,
        });
      }
    } catch (error) {
      console.log('Error is =>', error);
      res.status(500).json({
        message: error?.message || error,
        error: true,
        data: {},
      });
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.params;
      const deletedPlanning = await framework.services.planning.basic.delete(id);
      if (!deletedPlanning) {
        res.status(400).json({
          message: "Invalid Data Or Record Doesn't Exists",
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: deletedPlanning,
        });
      }
    } catch (error) {
      console.log('Error is =>', error);
      res.status(500).json({
        message: error?.message || error,
        error: true,
        data: {},
      });
    }
  },
  update: async (req, res) => {
    try {
      let { id } = req.params;
      let planningData = req.body;
      let existingData = await framework.models.planning_generals.findByPk(id);
      let is_updated = false;
      let is_errored = false;
      const is_monitor_absent = planningData.status === 'absent' && planningData.motif === 'Instructeur absent';
      if (
        moment(existingData.start_horary).format('YYYY-MM-DD HH:mm:ss') !=
          moment(planningData.start_horary).format('YYYY-MM-DD HH:mm:ss') ||
        moment(existingData.end_horary).format('YYYY-MM-DD HH:mm:ss') !=
          moment(planningData.end_horary).format('YYYY-MM-DD HH:mm:ss')
      ) {
        is_updated = true;
      } else {
        is_updated = existingData.is_updated || false;
      }
      if (existingData.instructor_id != planningData.instructor_id) {
        is_errored = true;
      } else {
        is_errored = existingData.is_errored || false;
      }
      let updatedData = await framework.services.planning.basic.update(id, { ...planningData, is_updated, is_errored });
      if (is_monitor_absent) {
        const sgMail = require('@sendgrid/mail');
        let student = await framework.models.students.findByPk(planningData.student_id, {
          attributes: ['email', 'firstname', 'lastname'],
        });
        if (student) {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: student?.email,
            from: 'rajanvasani9@gmail.com', // NOTE - Change to your verified sender
            subject: 'Your Driving Lesson Schedule Has Been Canceled',
            text: `Hello ${student?.firstname} ${student?.lastname},\n\nWe regret to inform you that your scheduled driving lesson has been canceled due to your instructor's illness. We apologize for any inconvenience this may cause. Please contact us to reschedule your lesson at your earliest convenience.\n\nThank you for your understanding.\n\nSincerely,\nYour Driving School Team`,
            html: `<p>Hello ${student?.firstname} ${student?.lastname},</p>
                  <p>We regret to inform you that your scheduled driving lesson has been canceled due to your instructor's illness. We apologize for any inconvenience this may cause. Please contact us to reschedule your lesson at your earliest convenience.</p>
                  <p>Thank you for your understanding.</p>
                  <p>Sincerely,<br>Your Driving School Team</p>`,
          };
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sended to student');
            })
            .catch((error) => {
              console.error(error.response.body);
            });
        }
      }
      if (!updatedData) {
        res.status(400).json({
          message: "Invalid Data Or Record Doesn't Exists",
          error: true,
          data: {},
        });
      } else {
        res.status(201).json({
          message: '',
          error: false,
          data: updatedData,
        });
      }
    } catch (error) {
      console.log('Error is =>', error);
      res.status(500).json({
        message: error?.message || error,
        error: true,
        data: {},
      });
    }
  },
};
