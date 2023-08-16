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
};
