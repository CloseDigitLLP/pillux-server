const moment = require("moment/moment");

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
      if (
        moment(existingData.start_horary).format("YYYY-MM-DD HH:mm:ss") != moment(planningData.start_horary).format("YYYY-MM-DD HH:mm:ss") ||
        moment(existingData.end_horary).format("YYYY-MM-DD HH:mm:ss") != moment(planningData.end_horary).format("YYYY-MM-DD HH:mm:ss")
      ) {
        is_updated = true;
      } else {
        is_updated = existingData.is_updated || false;
      }
      if(existingData.instructor_id != planningData.instructor_id) {
        is_errored = true;
      } else {
        is_errored = existingData.is_errored || false;
      }
      let updatedData = await framework.services.planning.basic.update(id, { ...planningData, is_updated, is_errored });
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
