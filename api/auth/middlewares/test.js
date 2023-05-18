module.exports = {
  validateUser: (req, res, next) => {
    const { email, password } = req.body;

    console.log(email,password);
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
};
