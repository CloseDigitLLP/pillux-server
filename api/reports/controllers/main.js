module.exports = {
  list: async (req, res) => {
    try {
      let reports = await framework.services.reports.basic.fetch(null, {}, req?.user);
      if (!reports) {
        res.status(200).json({
          message: 'no records found!',
          error: false,
          data: [],
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: reports,
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
      let reports = await framework.services.reports.basic.fetch(id);
      if (!reports) {
        res.status(200).json({
          message: 'no record found!',
          error: true,
          data: {},
        });
      } else {
        res.status(200).json({
          message: '',
          error: false,
          data: reports[0],
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
      let { reportData } = req.body;
      reportData = JSON.parse(reportData);
      let reportDocs = [];
      let report = await framework.services.reports.basic.create(reportData);
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          reportDocs.push({
            report_id: report.id,
            type: file.fieldname,
            documentReport: {
              type: file.mimetype,
              path: file.path,
            },
          });
        });
      }
      if (!report) {
        res.status(400).json({
          message: 'invalid data',
          error: true,
          data: {},
        });
      } else {
        await framework.services.reports.updateDocs.addUpdateImages(reportDocs);
        res.status(200).json({
          message: '',
          error: false,
          data: report,
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
      let { reportData } = req.body;
      reportData = JSON.parse(reportData);
      let reportDocs = [];
      let existingDocs = reportData?.docs;
      let report = await framework.services.reports.basic.update(id, reportData);
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          reportDocs.push({
            id: existingDocs?.id,
            report_id: existingDocs?.report_id || id,
            document_id: existingDocs?.document_id,
            type: file.fieldname,
            documentReport: {
              id: existingDocs?.document_id,
              type: file.mimetype,
              path: file.path,
            },
          });
        });
      }
      if (!report) {
        res.status(400).json({
          message: 'invalid data or record does not exists',
          error: true,
          data: {},
        });
      } else {
        await framework.services.reports.updateDocs.addUpdateImages(reportDocs);
        res.status(200).json({
          message: '',
          error: false,
          data: report,
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
      let report = await framework.services.reports.basic.delete(id);
      if (!report) {
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
      let defaultTypes = await framework.services.reports.basic.types();
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
};
