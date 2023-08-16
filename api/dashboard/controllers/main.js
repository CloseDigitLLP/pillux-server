module.exports = {
  getAllUsers: async (req, res) => {
    let where = {};
    let user = req?.user;
    if (user?.usersRole?.name !== 'Super Gérants') {
      where['$userDrivingschool.drivingschool_id$'] = {
        [Sequelize.Op.eq]: user?.userDrivingschool?.map((drivingSchool) => drivingSchool?.drivingschool_id),
      };
    }
    let users = await framework.models.users.findAll({ where });
    res.json(users);
  },
  list: async (req, res) => {
    try {
      let user = req?.user;

      let data = await framework.services.dashboard.basic.fetch(user);
      if (!data) {
        res.status(404).json({
          message: 'Data Not Found',
          error: true,
          data: {},
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
        data: {},
      });
    }
  },
};
