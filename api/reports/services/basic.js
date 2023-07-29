
module.exports = {
  fetch: async (id, where = {}, user) => {
    try {
      if (user?.usersRole?.name == 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      if (id) {
        where.id = id;
      }
      return await framework.models.report.findAll({
        include: [
          {
            model: framework.models.report_document,
            as: 'reportDocs',
            require: false,
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
              {
                model: framework.models.document,
                as: 'documentReport',
                require: false,
                attributes: { exclude: ['created_at', 'updated_at'] },
              },
            ],
          },
          {
            model: framework.models.vehicles,
            as: 'vehicleReport',
            attributes: ['id', 'name', 'immatriculation', 'date']
          }
        ],
        where,
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  vehicleReport: async (id) => {
    try {
      let where = {}
      if (id) {
        where.vehicle_id = id;
      }
      return await framework.models.report.findAll({
        include: [
          {
            model: framework.models.report_document,
            as: 'reportDocs',
            require: false,
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
              {
                model: framework.models.document,
                as: 'documentReport',
                require: false,
                attributes: { exclude: ['created_at', 'updated_at'] },
              },
            ],
          },
          {
            model: framework.models.vehicles,
            as: 'vehicleReport',
            attributes: ['id', 'name', 'immatriculation', 'date']
          },
          {
            model: framework.models.types,
            as: 'reportType'
          }
        ],
        where,
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  create: async (data) => {
    try {
      const repair = await framework.models.report.create(data);
      return repair;
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  update: async (id, data) => {
    try {
      return await framework.models.report.update(data, { where: { id } });
    } catch (error) {
      console.log('error=>', error);
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      return await framework.models.report.destroy({ where: { id } });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  types: async () => {
    try {
      return await framework.models.types.findAll({
        where: {
          type: 'accident',
        },
      });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
