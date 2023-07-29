module.exports = {
  validateUser: (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res
        .status(400)
        .send({
          message: "Email and password are required",
          error: true,
          data: {},
        });
    }
    
    next();
  },
  validateEmail: (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
      return res
        .status(400)
        .send({
          message: "Email is required",
          error: true,
          data: {},
        });
    }
    
    next();
  },
  validateOtp: (req, res, next) => {
    const { otp, email } = req.body;
    
    if (!otp || Number.isNaN(otp) || !email) {
      return res
        .status(400)
        .send({
          message: "Valid email and otp are required",
          error: true,
          data: {},
        });
    }
    
    next();
  },
  validateSavePassword: (req, res, next) => {
    const { password, email } = req.body;
    
    if (!password || !email) {
      return res
        .status(400)
        .send({
          message: "Valid email and password are required",
          error: true,
          data: {},
        });
    }
    
    next();
  }
};
