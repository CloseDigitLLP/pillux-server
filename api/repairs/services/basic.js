
module.exports = {
  fetch: async (id, where = {}, user) => {
    try {
      if (user?.usersRole?.name == 'Moniteurs') {
        where['instructor_id'] = user?.id;
      }

      if (id) {
        where.id = id;
      }
      return await framework.models.repairs.findAll({
        include: [
          {
            model: framework.models.repair_document,
            as: 'repairDoc',
            require: false,
            attributes: { exclude: ['created_at', 'updated_at'] },
            include: [
              {
                model: framework.models.document,
                as: 'documentRepair',
                require: false,
                attributes: { exclude: ['created_at', 'updated_at'] },
              },
            ],
          },
          {
            model: framework.models.vehicles,
            as: 'vehicleRepairs',
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
  create: async (data) => {
    try {
      const repair = await framework.models.repairs.create(data);
      return repair;
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
  update: async (id, data) => {
    try {
      return await framework.models.repairs.update(data, { where: { id } });
    } catch (error) {
      console.log('error=>', error);
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      return await framework.models.repairs.destroy({ where: { id } });
    } catch (error) {
      console.log('error =>', error);
      return Promise.reject(error);
    }
  },
};
