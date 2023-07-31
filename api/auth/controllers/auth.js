const md5 = require("md5");
const moment = require("moment/moment");
module.exports = {
  login: async (req, res) => {
    try {
      var { email, password } = req.body;
      password = md5(password);

      let user = await framework.services.auth.authentication.login(
        email,
        password
      );
      if (!user || user?.usersRole?.name == 'Moniteurs' || !user?.usersRole) {
        return res.status(404).send({
          message: "User not found",
          error: true,
          data: {},
        });
      } else {
        user = JSON.parse(JSON.stringify(user));
        let { accessToken } = framework.functions.jwt.getAccessToken(user);
        let { refreshToken } = framework.functions.jwt.getRefreshToken(user);
        let exp = framework.functions.jwt.expiresIn(accessToken);
        user = {
          ...user,
          accessToken,
          refreshToken,
          exp,
        };
        return res.send({
          message: "",
          error: false,
          data: user,
        });
      }
    } catch (e) {
      return res.status(400).send({
        message: e.message,
        error: true,
        data: e.message,
      });
    }
  },
  monitorLogin: async (req, res) => {
    try {
      var { email, password } = req.body;
      password = md5(password);

      let user = await framework.services.auth.authentication.instructorLogin(
        email,
        password
      );
      if (!user || user?.usersRole?.name !== 'Moniteurs' || !user?.usersRole) {
        return res.status(404).send({
          message: "User not found",
          error: true,
          data: {},
        });
      } else {
        user = JSON.parse(JSON.stringify(user));
        let { accessToken } = framework.functions.jwt.getMonitorAccessToken(user);
        let { refreshToken } = framework.functions.jwt.getRefreshToken(user);
        let exp = framework.functions.jwt.expiresIn(accessToken);
        user = {
          ...user,
          accessToken,
          refreshToken,
          exp,
        };
        return res.send({
          message: "",
          error: false,
          data: user,
        });
      }
    } catch (e) {
      return res.status(400).send({
        message: e.message,
        error: true,
        data: e.message,
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      var { email } = req.body;

      let user = await framework.services.auth.authentication.verifyInstructorEmail(email);
      
      if (user?.id) {

        function generateOTP() {
          const min = 100000; // Minimum value for 6-digit OTP
          const max = 999999; // Maximum value for 6-digit OTP
          return String(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        const otp = generateOTP()
        console.log(otp, "<====== otp")
        const hashedOtp = md5(otp)
        
        await framework.services.auth.authentication.saveGeneratedOtp(hashedOtp, user?.email)

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: 'jenishdpc66@gmail.com', // Change to your recipient
          from: 'rajanvasani9@gmail.com', // Change to your verified sender
          subject: 'OTP for forgot password request',
          text: `Hello, Dear User - ${
            user?.first + ' ' + user?.lastname
          }, this is a otp for your request of forgot password.`,
          html: `<strong>OTP ${otp}</strong>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent');
            res.status(200).json({
              message: 'email was successfully sended',
              error: false,
              data: `Otp successfully send on email id ${
                user?.email
              }`,
            });
          })
          .catch((error) => {
            console.error(error.response.body);
            res.status(500).json({
              message: 'sending remider failed...',
              error: true,
              data: error?.response,
            });
          });
      } else {
        return res.send({
          message: 'User not found',
          error: true,
          data: {},
        });
      }
    } catch (e) {
      return res.status(400).send({
        message: e.message,
        error: true,
        data: e.message,
      });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      var { otp, email } = req.body;

      const hashedOtp = md5(otp)

      let user = await framework.services.auth.authentication.verifyOtp(hashedOtp, email);
      
      if (user?.id) {

        let currentTime = moment.utc()
        let validatingTime = moment.utc(user?.password_requested_at).add(30, 'minutes')

        if(validatingTime.isBefore(currentTime)){
          return res.send({
            message: 'otp expired!',
            error: true,
            data: {
              isValid: false
            },
          });
        }

        return res.send({
          message: 'Success',
          error: false,
          data: {
            isValid: true
          },
        })
      } else {
        return res.send({
          message: 'invalid otp entered',
          error: true,
          data: {
            isValid: false
          },
        });
      }
    } catch (e) {
      return res.status(400).send({
        message: e.message,
        error: true,
        data: e.message,
      });
    }
  },
  savePassword: async (req, res) => {
    try {
      var { password, email } = req.body;

      const hashedPassword = md5(password)

      let user = await framework.services.auth.authentication.updatePassword(hashedPassword, email);
      
      if (user) {
        return res.send({
          message: 'Success',
          error: false,
          data: {
            isValid: true
          },
        })
      } else {
        return res.send({
          message: 'Error while updating password!',
          error: true,
          data: {
            isValid: false
          },
        });
      }
    } catch (e) {
      return res.status(400).send({
        message: e.message,
        error: true,
        data: e.message,
      });
    }
  },
};
