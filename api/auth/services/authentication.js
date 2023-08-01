const moment = require('moment')

module.exports = {
  login: async (email, password) => {
    try {
      return await framework.models.users.findOne({
        where: {
          email,
          password,
          enabled: true
        },
        attributes: ['email', 'firstname', 'lastname', 'id'],
        include: [
          { model: framework.models.roles, as: 'usersRole', attributes: ['name'] },
          { model: framework.models.user_drivingschool, as: 'userDrivingschool' },
        ],
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  instructorLogin: async (email, password) => {
    try {
      return await framework.models.users.findOne({
        where: {
          email,
          password,
          enabled: true,
        },
        attributes: ['email', 'firstname', 'lastname', 'id'],
        include: [
          {
            model: framework.models.roles,
            as: 'usersRole',
            attributes: ['name'],
          },
          {
            model: framework.models.user_drivingschool,
            as: 'userDrivingschool',
            include: [
              {
                model: framework.models.driving_schools,
                as: 'drivingSchoolUser',
                include: [
                  {
                    model: framework.models.vehicles,
                    as: 'drivingSchoolVehicles',
                    attributes: ['id', 'name', 'immatriculation', 'date'],
                    include: [
                      {
                        model: framework.models.vehicle_images,
                        as: 'vehicleImage',
                      },
                      {
                        model: framework.models.vehicle_types,
                        as: 'VehicleTypes',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  verifyInstructorEmail: async (email) => {
    try {
      return await framework.models.users.findOne({
        where: {
          email
        },
        attributes: ['email', 'firstname', 'lastname', 'id'],
        include: [
          {
            model: framework.models.roles,
            as: 'usersRole',
            attributes: ['name'],
          },
        ],
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  saveGeneratedOtp: async (otp, email) => {
    try {
      return await framework.models.users.update(
        {
          confirmation_token: otp,
          password_requested_at: moment.utc().toDate()
        },
        {
          where: {
            email
          },
        }
      );
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  verifyOtp: async (otp, email) => {
    try {
      return await framework.models.users.findOne(
        {
          where: {
            email,
            confirmation_token: otp
          },
        }
      );
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  updatePassword: async (password, email) => {
    try {
      return await framework.models.users.update(
        {
          password
        },
        {
          where: {
            email
          },
        }
      );
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  changePassword: async (id, password, newPassword) => {
    console.log(password, id)

    try {
      return await framework.models.users.update(
        {
          password: newPassword
        },
        {
          where: {
            id,
            password
          },
          returning: true,
          plain: true
        }
      );
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
};
