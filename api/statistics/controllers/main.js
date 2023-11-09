module.exports = {
  studentCounts: async (req, res) => {
    try {
      let states = await framework.services.statistics.basic.totalCount(req?.user);
      if (!states) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: states,
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
  totalHour: async (req, res) => {
    try {
      let selledHours = await framework.services.statistics.basic.hours(req?.user);
      if (!selledHours) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: selledHours,
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
  planningHours: async (req, res) => {
    try {
      let data = await framework.services.statistics.basic.plannings(req?.user);
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
  modifiedHours: async (req, res) => {
    try {
      let data = await framework.services.statistics.basic.modify(req?.user);
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
  cancledHours: async (req, res) => {
    try {
      let data = await framework.services.statistics.basic.cancled(req?.user);
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
  erroredHours: async (req, res) => {
    try {
      let data = await framework.services.statistics.basic.errored(req?.user);
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
  instructorHours: async (req, res) => {
    try {
      let instructorId = req?.query?.instructorId;
      let instructorUser;
      if (instructorId) {
        instructorUser = await framework.models.users.findOne({
          where: {
            id: instructorId,
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
            },
          ],
        });
      }
      let data = await framework.services.statistics.basic.totalInstructorHours(
        instructorId ? instructorUser : req.user
      );
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
  instructorAbsent: async (req, res) => {
    try {
      let instructorId = req?.query?.instructorId;
      let instructorUser;
      if (instructorId) {
        instructorUser = await framework.models.users.findOne({
          where: {
            id: instructorId,
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
            },
          ],
        });
      }
      let data = instructorId
        ? await framework.services.statistics.basic.absentInstructorAdminList(instructorUser)
        : await framework.services.statistics.basic.absentInstructorList(req?.user);
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data,
        });
      }
    } catch (error) {
      console.log('Error is => ', error);
      res.status(500).json({
        message: error?.message || error,
        error: true,
        data: [],
      });
    }
  },
  instructorWishlist: async (req, res) => {
    try {
      let instructorId = req?.query?.instructorId;
      let instructorUser;
      if (instructorId) {
        instructorUser = await framework.models.users.findOne({
          where: {
            id: instructorId,
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
            },
          ],
        });
      }
      let data = await framework.services.statistics.basic.wishlistInstructorCount(
        instructorId ? instructorUser : req?.user
      );
      if (!data) {
        res.status(200).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
  instructorAverage: async (req, res) => {
    try {
      let instructorId = req?.query?.instructorId;
      let instructorUser;
      if (instructorId) {
        instructorUser = await framework.models.users.findOne({
          where: {
            id: instructorId,
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
            },
          ],
        });
      }
      let data = await framework.services.statistics.basic.averageInstructorHours(
        instructorId ? instructorUser : req?.user
      );
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
  instructorVehicleStats: async (req, res) => {
    try {
      let instructorId = req?.query?.instructorId;
      let instructorUser;
      if (instructorId) {
        instructorUser = await framework.models.users.findOne({
          where: {
            id: instructorId,
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
            },
          ],
        });
      }
      let data = await framework.services.statistics.basic.vehicleInstructorTotal(
        instructorId ? instructorUser : req?.user
      );
      if (!data) {
        res.status(400).json({
          message: 'Data Not Found',
          error: false,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: data,
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
};
