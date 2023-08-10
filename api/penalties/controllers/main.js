module.exports = {
  list: async (req, res) => {
    try {
      let penalties = await framework.services.penalties.basic.fetch(null, {}, req?.user);
      if (!penalties) {
        res.status(200).json({
          message: 'no records found!',
          error: false,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: penalties,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        messagae: error?.message,
        error: true,
        data: error,
      });
    }
  },
  vehiclepenalties: async (req, res) => {
    try {
      let { id } = req.params;
      let penalties = await framework.services.penalties.basic.vehiclePenalty(id, {}, req?.user);
      if (!penalties) {
        res.status(200).json({
          message: 'no records found!',
          error: false,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: penalties,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        messagae: error?.message,
        error: true,
        data: error,
      });
    }
  },
  single: async (req, res) => {
    try {
      let { id } = req.params;
      let penalty = await framework.services.penalties.basic.fetch(id);
      if (!penalty) {
        res.status(200).json({
          message: 'no record found!',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: penalty[0],
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        messagae: error?.message,
        error: true,
        data: error,
      });
    }
  },
  create: async (req, res) => {
    try {
      let { penaltyData } = req.body;
      penaltyData = JSON.parse(penaltyData);
      let penaltyImage = [];
      let penalty = await framework.services.penalties.basic.create(penaltyData);
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          penaltyImage.push({
            penalty_id: penalty.id,
            type: file.fieldname,
            documentPenalty: {
              type: file.mimetype,
              path: file.path,
            },
          });
        });
      }
      if (!penalty) {
        res.status(400).json({
          message: 'invalid data',
          error: true,
          data: {},
        });
      } else {
        await framework.services.penalties.updatePenaltyImages.addUpdateImages(penaltyImage);
        res.status(200).json({
          message: '',
          error: false,
          data: penalty,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        message: error?.message,
        error: true,
        data: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      let { id } = req.params;
      let { penaltyData } = req.body;
      penaltyData = JSON.parse(penaltyData);
      let penaltyImage = [];
      let ids = penaltyData?.deletedDocsIds || [];
      let penalty = await framework.services.penalties.basic.update(id, penaltyData);
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          penaltyImage.push({
            penalty_id: penalty.id,
            type: file.fieldname,
            documentPenalty: {
              type: file.mimetype,
              path: file.path,
            },
          });
        });
      }
      if (!penalty) {
        res.status(400).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        await framework.services.penalties.updatePenaltyImages.deleteDocs(ids);
        await framework.services.penalties.updatePenaltyImages.addUpdateImages(penaltyImage);
        res.status(200).json({
          message: '',
          error: false,
          data: penalty,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        message: error?.message,
        error: true,
        data: error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.params;
      let penalty = await framework.services.penalties.basic.delete(id);
      if (!penalty) {
        res.status(400).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: penalty,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        message: error?.message,
        error: true,
        data: error,
      });
    }
  },
  typesList: async (req, res) => {
    try {
      let defaultTypes = await framework.services.penalties.basic.types();
      if (!defaultTypes) {
        res.status(200).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: defaultTypes,
        });
      }
    } catch (error) {
      console.log('error =>', error);
      res.status(500).json({
        message: error?.message,
        error: true,
        data: error,
      });
    }
  },
};
