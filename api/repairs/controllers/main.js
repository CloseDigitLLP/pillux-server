module.exports = {
  list: async (req, res) => {
    try {
      let repairs = await framework.services.repairs.basic.fetch(null, {}, req?.user);
      if (!repairs) {
        res.status(200).json({
          message: 'no records found!',
          error: false,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: repairs,
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
      let repair = await framework.services.repairs.basic.fetch(id);
      if (!repair) {
        res.status(200).json({
          message: 'no record found!',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: repair[0],
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
      let { repairData } = req.body;
      repairData = JSON.parse(repairData);
      let repairDocs = [];
      let repair = await framework.services.repairs.basic.create(repairData);
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          repairDocs.push({
            vehicle_id: repairData.vehicle_id,
            repair_id: repair.id,
            instructor_id: req?.user?.id,
            documentRepair: {
              type: file.mimetype,
              path: file.path,
            },
          });
        });
      }
      if (!repair) {
        res.status(400).json({
          message: 'invalid data',
          error: true,
          data: {},
        });
      } else {
        await framework.services.repairs.updateDocs.addUpdateImages(repairDocs);
        res.status(200).json({
          message: '',
          error: false,
          data: repair,
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
      let { repairData } = req.body;
      repairData = JSON.parse(repairData);
      let repairDocs = [];
      let existingDocs = repairData?.docs;
      let repair = await framework.services.repairs.basic.update(id, repairData);
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          repairDocs.push({
            id: existingDocs?.id,
            vehicle_id: existingDocs?.vehicle_id || repair?.vehicle_id,
            repair_id: existingDocs?.repair_id || id,
            instructor_id: req?.user?.id,
            document_id: existingDocs?.document_id,
            documentRepair: {
              id:existingDocs?.document_id,
              type: file.mimetype,
              path: file.path,
            },
          });
        });
      }
      if (!repair) {
        res.status(400).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        await framework.services.repairs.updateDocs.addUpdateImages(repairDocs);
        res.status(200).json({
          message: '',
          error: false,
          data: repair,
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
      let repair = await framework.services.repairs.basic.delete(id);
      if (!repair) {
        res.status(400).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: repair,
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
      let defaultTypes = await framework.services.repairs.basic.types();
      if (!defaultTypes) {
        res.status(400).json({
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
  vehiclerepairs: async (req, res) => {
    try {
      let { id } = req.params;
      let repairs = await framework.services.repairs.basic.vehicleRepair(id);
      if (!repairs?.length) {
        res.status(200).json({
          message: 'no records found!',
          error: true,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: repairs,
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
};
